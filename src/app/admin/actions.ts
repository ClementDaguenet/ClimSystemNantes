"use server";

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
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

async function persistUploadPublic(file: File): Promise<string> {
  if (process.env.NETLIFY === "true") {
    throw new Error(
      "Les envois de fichiers ne sont pas disponibles sur Netlify (disque en lecture seule). Utilisez une URL vers une image ou un PDF déjà hébergés (CDN, stockage cloud, etc.).",
    );
  }
  const original = file.name || "fichier";
  const mime = file.type;
  let ext =
    /\.(png|jpe?g|webp|gif|pdf)$/i.exec(original)?.[0]?.toLowerCase() ??
    "";
  if (!ext) {
    if (mime === "application/pdf") ext = ".pdf";
    else if (mime.includes("webp")) ext = ".webp";
    else if (mime.includes("png")) ext = ".png";
    else if (mime.includes("jpeg")) ext = ".jpg";
    else ext = "";
  }
  if (!ext) {
    throw new Error(
      "Extension de fichier non reconnue — utilisez PNG, JPG, WebP, GIF ou PDF.",
    );
  }
  const extBase = ext.replace(/^\./, "");
  if (!/^(png|jpg|jpeg|webp|gif|pdf)$/.test(extBase)) {
    throw new Error("Format non accepté — PNG, JPG, WebP, GIF ou PDF.");
  }
  const slug = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const name = `upload-${slug}${ext}`;
  const dir = join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(join(dir, name), buf);
  return `/uploads/${name}`;
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
  if (!group) redirect("/admin/textes");

  const keys = CONTENT_SEED_ROWS.filter((r) => r.group === group);
  for (const row of keys) {
    const raw = formData.get(row.key);
    const value =
      raw === null || raw === undefined ? "" : String(raw);
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
  revalidatePath("/", "layout");
  revalidatePath("/solutions");
  revalidatePath("/contact");
  revalidatePath("/agences");
  revalidatePath("/sav");
  redirect(`/admin/textes?saved=${encodeURIComponent(group)}`);
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
      `/admin/parametres?err=${encodeURIComponent("site_settings introuvable — lancez le seed.")}`,
    );

  const footerIntro = formData.get("footerIntro")?.toString() ?? cur.footerIntro;
  let savFlyerImage =
    formData.get("savFlyerImage")?.toString()?.trim() ??
    cur.savFlyerImage;
  const savFlyerPdfRaw =
    formData.get("savFlyerPdf")?.toString()?.trim() ?? "";
  const savImageAltRaw =
    formData.get("savImageAlt")?.toString()?.trim() ?? "";

  try {
    const imgFile = formData.get("savFlyerImageFile");
    if (
      imgFile &&
      typeof imgFile !== "string" &&
      typeof (imgFile as File).arrayBuffer === "function" &&
      (imgFile as File).size > 0
    ) {
      savFlyerImage = await persistUploadPublic(imgFile as File);
    }
    const pdfFile = formData.get("savFlyerPdfFile");
    let savFlyerPdf = savFlyerPdfRaw || cur.savFlyerPdf || null;
    if (
      pdfFile &&
      typeof pdfFile !== "string" &&
      typeof (pdfFile as File).arrayBuffer === "function" &&
      (pdfFile as File).size > 0
    ) {
      savFlyerPdf = await persistUploadPublic(pdfFile as File);
    }

    await prisma.siteSettings.update({
      where: { id: 1 },
      data: {
        footerIntro,
        savFlyerImage,
        savFlyerPdf: savFlyerPdf || null,
        savImageAlt: savImageAltRaw || null,
      },
    });
  } catch (e) {
    const msg =
      e instanceof Error ? e.message : "Erreur enregistrement paramètres.";
    redirect(`/admin/parametres?err=${encodeURIComponent(msg)}`);
  }

  revalidatePath("/", "layout");
  revalidatePath("/sav");
  redirect("/admin/parametres?ok=1");
}
