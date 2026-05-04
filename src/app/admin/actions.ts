"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { CONTENT_SEED_ROWS } from "@/lib/cms/contentSeed";
import {
  clearAdminSessionCookie,
  createAdminJwt,
  requireAdminSession,
  setAdminSessionCookie,
} from "@/lib/admin/session";
import {
  CMS_IMAGE_FORM_KEEP_INLINE,
  cmsImageUploadFieldName,
} from "@/lib/admin/cmsUpload";

const MAX_CMS_UPLOAD_IMAGE_BYTES = 2 * 1024 * 1024;

/**
 * Téléversement image CMS (« Photos & médias ») : stockage en data-URL dans la base (≤ 2 Mo).
 * Open Graph : uniquement champ URL HTTPS (pas de fichier).
 */
async function persistUploadedCmsImage(
  file: File,
  options: { allowInlineDataUrlWithoutDisk: boolean },
): Promise<string> {
  if (file.size === 0) {
    throw new Error("Le fichier envoyé est vide.");
  }
  if (file.size > MAX_CMS_UPLOAD_IMAGE_BYTES) {
    throw new Error(
      `Image trop volumineuse (maximum ${Math.round(MAX_CMS_UPLOAD_IMAGE_BYTES / (1024 * 1024))} Mo). Réduisez la taille ou utilisez une adresse HTTPS.`,
    );
  }

  if (!options.allowInlineDataUrlWithoutDisk) {
    throw new Error(
      "Pour l’aperçu sur les réseaux sociaux (Open Graph), collez une adresse HTTPS vers l’image ; le téléversement fichier n’est pas prévu pour ce champ.",
    );
  }

  const original = file.name || "image";
  const mimeRaw = file.type || "";
  const mime = mimeRaw.split(";")[0].trim().toLowerCase();
  let ext =
    /\.(png|jpe?g|webp|gif)$/i.exec(original)?.[0]?.toLowerCase() ?? "";
  if (!ext) {
    if (mime === "image/webp") ext = ".webp";
    else if (mime === "image/png") ext = ".png";
    else if (mime === "image/gif") ext = ".gif";
    else if (mime === "image/jpeg" || mime === "image/jpg") ext = ".jpg";
    else ext = "";
  }

  const isLikelyImage =
    /^image\/(png|gif|webp|jpeg|jpg)$/i.test(mime) ||
    /\.(png|jpe?g|webp|gif)$/i.test(original);
  if (!isLikelyImage || !ext) {
    throw new Error(
      "Type non reconnu : utilisez une image PNG, JPG, WebP ou GIF.",
    );
  }

  const buf = Buffer.from(await file.arrayBuffer());

  let safeMime =
    mime && /^image\/(png|gif|webp|jpe?g|jpeg)$/i.test(mime) ? mime : "";
  if (safeMime === "image/jpg") safeMime = "image/jpeg";
  if (!safeMime) {
    if (ext === ".png") safeMime = "image/png";
    else if (ext === ".webp") safeMime = "image/webp";
    else if (ext === ".gif") safeMime = "image/gif";
    else safeMime = "image/jpeg";
  }

  const b64 = buf.toString("base64");
  return `data:${safeMime};base64,${b64}`;
}

export async function adminLoginAction(formData: FormData) {
  const password = formData.get("password")?.toString() ?? "";
  const rawNext = formData.get("next")?.toString() ?? "";
  const next =
    rawNext.startsWith("/admin") && !rawNext.startsWith("/admin/login")
      ? rawNext
      : "/admin";
  const expected = process.env.ADMIN_PASSWORD;
  if (
    !process.env.ADMIN_JWT_SECRET ||
    !expected ||
    expected.length === 0
  ) {
    redirect("/admin/login?err=config");
  }
  if (password !== expected) {
    redirect("/admin/login?err=auth");
  }
  const token = await createAdminJwt();
  await setAdminSessionCookie(token);
  redirect(next);
}

export async function adminLogoutAction() {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}

export async function saveContentGroupAction(formData: FormData) {
  await requireAdminSession();
  const group = formData.get("group")?.toString()?.trim();
  const returnTo = formData.get("adminReturnTo")?.toString()?.trim();
  const basePath =
    returnTo === "medias" ? "/admin/medias" : "/admin/textes";
  if (!group) redirect(basePath);

  const pageFilterRaw = formData.get("adminPageFilter")?.toString()?.trim() ?? "";
  const pageQs =
    returnTo !== "medias" && pageFilterRaw && /^[a-z0-9-]+$/.test(pageFilterRaw)
      ? `&page=${encodeURIComponent(pageFilterRaw)}`
      : "";

  const rowsInGroup = CONTENT_SEED_ROWS.filter((r) => r.group === group);

  try {
    const keysInGroup = rowsInGroup.map((r) => r.key);
    const existingBlocks = await prisma.contentBlock.findMany({
      where: { key: { in: keysInGroup } },
    });
    const existingValueByKey = new Map(
      existingBlocks.map((b) => [b.key, b.value]),
    );

    for (const row of rowsInGroup) {
      const raw = formData.get(row.key);
      const rawStr =
        raw === null || raw === undefined ? "" : String(raw);

      const uploadCandidate = formData.get(
        cmsImageUploadFieldName(row.key),
      );
      const hasUpload =
        uploadCandidate &&
        typeof uploadCandidate !== "string" &&
        typeof (uploadCandidate as File).arrayBuffer === "function" &&
        (uploadCandidate as File).size > 0;

      let value: string;
      if (row.key.endsWith(".image_url")) {
        if (hasUpload) {
          const file = uploadCandidate as File;
          value = await persistUploadedCmsImage(file, {
            allowInlineDataUrlWithoutDisk: row.key !== "media.og.image_url",
          });
        } else if (rawStr === CMS_IMAGE_FORM_KEEP_INLINE) {
          value = existingValueByKey.get(row.key) ?? "";
        } else {
          value = rawStr;
        }
      } else {
        value = rawStr;
      }

      await prisma.contentBlock.upsert({
        where: { key: row.key },
        create: {
          key: row.key,
          label: row.label,
          group: row.group,
          value,
        },
        update: { value },
      });
    }
  } catch (e) {
    const msg =
      e instanceof Error
        ? e.message
        : "Impossible d’enregistrer ce groupe. Réessayez ou contactez l’éditeur du site.";
    redirect(
      `${basePath}?err=${encodeURIComponent(msg)}${returnTo !== "medias" ? pageQs : ""}`,
    );
  }

  revalidatePath("/", "layout");
  revalidatePath("/solutions");
  revalidatePath("/contact");
  revalidatePath("/agences");
  revalidatePath("/sav");
  redirect(`${basePath}?saved=${encodeURIComponent(group)}${pageQs}`);
}

const agencyParse = z.object({
  id: z.string().min(1).max(80),
  name: z.string().min(1).max(200),
  city: z.string().min(1).max(120),
  address: z.string().min(1).max(500),
  postalCode: z.string().min(4).max(20),
  phone: z.string().min(5).max(40),
  email: z.string().email(),
  hours: z.string().min(1).max(500),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  tagline: z.union([z.string().max(500), z.literal("")]).optional(),
  isFeatured: z
    .preprocess((v) => v === "on" || v === true, z.boolean()),
  sortOrder: z.coerce.number().int().min(0).max(9999),
});

async function clearAllFeatured() {
  await prisma.agency.updateMany({
    data: { isFeatured: false },
  });
}

async function propagateFeatured(id: string, isFeatured: boolean) {
  if (!isFeatured) return;
  await prisma.agency.updateMany({
    where: { NOT: { id } },
    data: { isFeatured: false },
  });
}

export async function createAgencyAction(formData: FormData) {
  await requireAdminSession();
  const taglineRaw = formData.get("tagline")?.toString() ?? "";
  const parsed = agencyParse.safeParse({
    id: formData.get("id")?.toString().trim(),
    name: formData.get("name")?.toString(),
    city: formData.get("city")?.toString(),
    address: formData.get("address")?.toString(),
    postalCode: formData.get("postalCode")?.toString(),
    phone: formData.get("phone")?.toString(),
    email: formData.get("email")?.toString(),
    hours: formData.get("hours")?.toString(),
    latitude: formData.get("latitude")?.toString(),
    longitude: formData.get("longitude")?.toString(),
    tagline: taglineRaw.trim(),
    isFeatured: formData.get("isFeatured")?.toString() === "on",
    sortOrder: formData.get("sortOrder")?.toString() ?? "99",
  });
  if (!parsed.success) {
    redirect(
      `/admin/agencies/new?err=${encodeURIComponent("Données invalides.")}`,
    );
  }
  const d = parsed.data;
  const sortOrder = d.sortOrder;

  if (d.isFeatured) await clearAllFeatured();

  await prisma.agency.create({
    data: {
      id: d.id,
      name: d.name,
      city: d.city,
      address: d.address,
      postalCode: d.postalCode,
      phone: d.phone,
      email: d.email,
      hours: d.hours,
      latitude: d.latitude,
      longitude: d.longitude,
      isFeatured: d.isFeatured,
      tagline: d.tagline ? d.tagline : null,
      sortOrder,
    },
  });
  revalidatePath("/");
  revalidatePath("/agences");
  revalidatePath("/contact");
  redirect("/admin/agencies");
}

export async function updateAgencyAction(id: string, formData: FormData) {
  await requireAdminSession();
  const taglineRaw = formData.get("tagline")?.toString() ?? "";
  const parsed = agencyParse.safeParse({
    id,
    name: formData.get("name")?.toString(),
    city: formData.get("city")?.toString(),
    address: formData.get("address")?.toString(),
    postalCode: formData.get("postalCode")?.toString(),
    phone: formData.get("phone")?.toString(),
    email: formData.get("email")?.toString(),
    hours: formData.get("hours")?.toString(),
    latitude: formData.get("latitude")?.toString(),
    longitude: formData.get("longitude")?.toString(),
    tagline: taglineRaw.trim(),
    isFeatured: formData.get("isFeatured")?.toString() === "on",
    sortOrder: formData.get("sortOrder")?.toString(),
  });

  if (!parsed.success || parsed.data.id !== id) {
    redirect(
      `/admin/agencies/${encodeURIComponent(id)}?err=${encodeURIComponent("Données invalides.")}`,
    );
  }
  const d = parsed.data;
  await propagateFeatured(id, d.isFeatured);

  await prisma.agency.update({
    where: { id },
    data: {
      name: d.name,
      city: d.city,
      address: d.address,
      postalCode: d.postalCode,
      phone: d.phone,
      email: d.email,
      hours: d.hours,
      latitude: d.latitude,
      longitude: d.longitude,
      isFeatured: d.isFeatured,
      tagline: d.tagline ? d.tagline : null,
      sortOrder: d.sortOrder,
    },
  });
  revalidatePath("/");
  revalidatePath("/agences");
  revalidatePath("/contact");
  redirect("/admin/agencies");
}

export async function deleteAgencyAction(agencyId: string) {
  await requireAdminSession();
  const count = await prisma.agency.count();
  if (count <= 1) {
    redirect(
      `/admin/agencies/${encodeURIComponent(agencyId)}?err=${encodeURIComponent("Impossible de supprimer la dernière agence.")}`,
    );
  }
  await prisma.agency.delete({ where: { id: agencyId } });
  revalidatePath("/", "layout");
  revalidatePath("/agences");
  revalidatePath("/contact");
  redirect("/admin/agencies");
}

export async function updateSiteSettingsAction(formData: FormData) {
  await requireAdminSession();
  const cur = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!cur)
    redirect(
      `/admin/parametres?err=${encodeURIComponent("site_settings introuvable - exécutez le seed contre la base (voir README).")}`,
    );

  const footerIntro =
    formData.get("footerIntro")?.toString() ?? cur.footerIntro;
  const savFlyerImage =
    formData.get("savFlyerImage")?.toString()?.trim() ??
    cur.savFlyerImage;
  const savFlyerPdfRaw =
    formData.get("savFlyerPdf")?.toString()?.trim() ?? "";
  const savImageAltRaw =
    formData.get("savImageAlt")?.toString()?.trim() ?? "";

  const savFlyerPdf = savFlyerPdfRaw || cur.savFlyerPdf || null;

  await prisma.siteSettings.update({
    where: { id: 1 },
    data: {
      footerIntro,
      savFlyerImage,
      savFlyerPdf,
      savImageAlt: savImageAltRaw || null,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/sav");
  redirect("/admin/parametres?ok=1");
}
