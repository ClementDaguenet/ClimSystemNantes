import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(80, "Le nom est trop long."),
  email: z
    .string()
    .min(1, "L'email est obligatoire.")
    .email("Adresse email invalide."),
  phone: z
    .string()
    .min(1, "Le téléphone est obligatoire.")
    .regex(
      /^(?:\+?\d[\d\s.-]{7,}\d)$/,
      "Numéro de téléphone invalide.",
    ),
  subject: z.string().min(2, "Précisez le sujet de votre demande.").max(200),
  message: z
    .string()
    .min(10, "Votre message doit contenir au moins 10 caractères.")
    .max(2000, "Votre message est trop long."),
  consent: z.literal(true, {
    message: "Vous devez accepter le traitement de vos données.",
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/** Corps JSON attendu par POST /api/contact. */
export const contactApiSchema = contactSchema.extend({
  /** Champ honeypot - doit rester vide (bots). */
  website: z.string().optional(),
});

export type ContactApiPayload = z.infer<typeof contactApiSchema>;
