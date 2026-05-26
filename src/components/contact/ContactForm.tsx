"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  Send,
  Loader2,
  User,
  Mail,
  Phone,
  MessageSquare,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { contactSchema, type ContactFormData } from "@/lib/contact/schema";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type ApiErrorBody = { error?: string };

export function ContactForm() {
  const searchParams = useSearchParams();
  const subjectFromUrl = searchParams.get("sujet") ?? "";

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: subjectFromUrl,
      message: "",
      consent: undefined,
    },
  });

  useEffect(() => {
    if (subjectFromUrl) {
      setValue("subject", subjectFromUrl, { shouldDirty: true, shouldTouch: true });
    }
  }, [subjectFromUrl, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: "" }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as ApiErrorBody;
        setErrorMessage(
          body.error ??
            "Une erreur est survenue. Merci de réessayer ou de nous joindre par téléphone.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      reset({
        name: "",
        email: "",
        phone: "",
        subject: subjectFromUrl,
        message: "",
        consent: undefined,
      });
    } catch (err) {
      console.error("[contact] envoi impossible", err);
      setErrorMessage(
        "Connexion impossible. Vérifiez votre réseau ou contactez-nous par téléphone.",
      );
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-describedby="form-status"
      className="space-y-5 rounded-3xl border border-clim-blue-100 bg-white p-6 shadow-soft sm:p-10"
    >
      {/* Honeypot anti-spam (caché des utilisateurs et lecteurs d'écran) */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Site web</label>
        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Nom complet"
          icon={User}
          autoComplete="name"
          placeholder="Jean Dupont"
          register={register("name")}
          error={errors.name?.message}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          icon={Mail}
          autoComplete="email"
          placeholder="jean.dupont@entreprise.fr"
          register={register("email")}
          error={errors.email?.message}
        />
        <Field
          id="phone"
          label="Téléphone"
          type="tel"
          icon={Phone}
          autoComplete="tel"
          placeholder="06 12 34 56 78"
          register={register("phone")}
          error={errors.phone?.message}
        />
        <Field
          id="subject"
          label="Sujet"
          icon={Tag}
          placeholder="Demande d'information, devis, SAV…"
          register={register("subject")}
          error={errors.subject?.message}
        />
      </div>

      <Field
        id="message"
        label="Votre message"
        icon={MessageSquare}
        as="textarea"
        rows={6}
        placeholder="Décrivez votre projet ou votre demande…"
        register={register("message")}
        error={errors.message?.message}
      />

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-clim-muted">
          <input
            type="checkbox"
            {...register("consent")}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 h-4 w-4 cursor-pointer rounded border-clim-blue-200 text-clim-red-500 focus:ring-2 focus:ring-clim-blue-500"
          />
          <span>
            J&apos;accepte que mes données soient utilisées pour traiter ma
            demande, conformément à la{" "}
            <a
              href="/politique-confidentialite"
              className="font-medium text-clim-blue-700 underline hover:text-clim-blue-800"
            >
              politique de confidentialité
            </a>
            .
          </span>
        </label>
        {errors.consent?.message && (
          <p
            id="consent-error"
            role="alert"
            className="mt-1 ml-7 text-sm text-clim-red-600"
          >
            {errors.consent.message}
          </p>
        )}
      </div>

      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          id="form-status"
          aria-live="polite"
          className="text-sm text-clim-muted"
        >
          <span aria-hidden="true">*</span> Tous les champs sont obligatoires.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-semibold text-white transition-all duration-200",
            "bg-clim-red-500 hover:bg-clim-red-600 shadow-[0_4px_14px_-2px_rgba(225,29,46,0.45)] hover:shadow-[0_6px_20px_-2px_rgba(225,29,46,0.55)] hover:-translate-y-0.5",
            "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
          )}
        >
          {status === "submitting" ? (
            <>
              <Loader2
                size={18}
                aria-hidden="true"
                className="animate-spin"
              />
              Envoi en cours…
            </>
          ) : (
            <>
              <Send size={18} aria-hidden="true" />
              Envoyer ma demande
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
          >
            <CheckCircle2
              size={20}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <div>
              <p className="font-semibold">Message envoyé avec succès</p>
              <p>
                Merci pour votre demande. Notre équipe vous recontactera dans les
                meilleurs délais, généralement sous 24 à 48 h ouvrées.
              </p>
            </div>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
          >
            <AlertCircle
              size={20}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-red-600"
            />
            <div>
              <p className="font-semibold">Échec de l&apos;envoi</p>
              <p>
                {errorMessage ??
                  "Une erreur est survenue. Merci de réessayer ou de nous joindre directement par téléphone à l'agence la plus proche."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  rows?: number;
  as?: "input" | "textarea";
  register: ReturnType<ReturnType<typeof useForm<ContactFormData>>["register"]>;
  error?: string;
}

function Field({
  id,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  autoComplete,
  rows,
  as = "input",
  register,
  error,
}: FieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const hasError = !!error;

  const commonClasses = cn(
    "block w-full rounded-xl border bg-white px-4 py-3 text-sm text-clim-ink placeholder:text-clim-muted/70",
    "transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-offset-1",
    hasError
      ? "border-clim-red-500 focus:ring-clim-red-500"
      : "border-clim-blue-100 focus:border-clim-blue-500 focus:ring-clim-blue-500",
  );

  return (
    <div className={cn(as === "textarea" && "sm:col-span-2")}>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-2 text-sm font-medium text-clim-ink"
      >
        <Icon size={14} aria-hidden className="text-clim-blue-500" />
        {label}
        <span aria-hidden="true" className="text-clim-red-500">
          *
        </span>
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={errorId}
          className={cn(commonClasses, "resize-y min-h-[140px]")}
          {...register}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={errorId}
          className={commonClasses}
          {...register}
        />
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 flex items-center gap-1 text-sm text-clim-red-600"
        >
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
