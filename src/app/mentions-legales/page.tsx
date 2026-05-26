import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { getFeaturedAgency } from "@/lib/cms/loaders";
import {
  DATABASE_HOSTING,
  EMAIL_PROVIDER,
  HOSTING,
  LEGAL_ENTITY,
} from "@/lib/legal/company";
import { getSiteHostLabel } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site Climsystem Distribution Atlantique : éditeur, hébergeur, propriété intellectuelle et conditions d'utilisation.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default async function MentionsLegalesPage() {
  const featuredAgency = await getFeaturedAgency();
  const siteHost = getSiteHostLabel();

  return (
    <LegalPageLayout
      eyebrow="Informations légales"
      title="Mentions légales"
      description="Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique (LCEN)."
      lastUpdated="26 mai 2026"
    >
      <h2>1. Éditeur du site</h2>
      <p>
        Le présent site, accessible à l&apos;adresse{" "}
        <strong>{siteHost}</strong>, est édité sous l&apos;enseigne{" "}
        <strong>{LEGAL_ENTITY.commercialName}</strong> par la société :
      </p>
      <div className="definitions">
        <div>
          <strong>Dénomination sociale&nbsp;:</strong> {LEGAL_ENTITY.denomination}
        </div>
        <div>
          <strong>Enseigne du site&nbsp;:</strong> {LEGAL_ENTITY.commercialName}
        </div>
        <div>
          <strong>Forme juridique&nbsp;:</strong> {LEGAL_ENTITY.legalForm}
        </div>
        <div>
          <strong>Capital social&nbsp;:</strong> {LEGAL_ENTITY.capitalSocial}&nbsp;€
        </div>
        <div>
          <strong>Siège social&nbsp;:</strong> {LEGAL_ENTITY.headquarters}
        </div>
        <div>
          <strong>Agence Ouest (contact site web)&nbsp;:</strong>{" "}
          {featuredAgency.address}, {featuredAgency.postalCode}{" "}
          {featuredAgency.city}
        </div>
        <div>
          <strong>SIREN&nbsp;:</strong> {LEGAL_ENTITY.siren}
        </div>
        <div>
          <strong>SIRET (siège)&nbsp;:</strong> {LEGAL_ENTITY.siretSiege}
        </div>
        <div>
          <strong>RCS&nbsp;:</strong> {LEGAL_ENTITY.rcs}
        </div>
        <div>
          <strong>N° TVA intracommunautaire&nbsp;:</strong> {LEGAL_ENTITY.tva}
        </div>
        <div>
          <strong>Activité&nbsp;:</strong> {LEGAL_ENTITY.activity}
        </div>
        <div>
          <strong>Code NAF/APE&nbsp;:</strong> {LEGAL_ENTITY.naf}
        </div>
        <div>
          <strong>Téléphone agence Nantes&nbsp;:</strong>{" "}
          <a href={`tel:${featuredAgency.phone.replace(/\s/g, "")}`}>
            {featuredAgency.phone}
          </a>
        </div>
        <div>
          <strong>Email agence Nantes&nbsp;:</strong>{" "}
          <a href={`mailto:${featuredAgency.email}`}>{featuredAgency.email}</a>
        </div>
        <div>
          <strong>Directeur de la publication&nbsp;:</strong>{" "}
          {LEGAL_ENTITY.publicationDirector}
        </div>
      </div>

      <h2>2. Hébergement du site</h2>
      <p>Le site est hébergé par&nbsp;:</p>
      <div className="definitions">
        <div>
          <strong>Hébergeur&nbsp;:</strong> {HOSTING.name}
        </div>
        <div>
          <strong>Adresse&nbsp;:</strong> {HOSTING.address}
        </div>
        <div>
          <strong>Site web&nbsp;:</strong>{" "}
          <a href={HOSTING.website} target="_blank" rel="noopener noreferrer">
            vercel.com
          </a>
        </div>
      </div>
      <p>
        Les contenus éditables (textes, images CMS, fiches agences) sont stockés
        dans une base de données PostgreSQL hébergée par{" "}
        <a
          href={DATABASE_HOSTING.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {DATABASE_HOSTING.name}
        </a>
        .
      </p>

      <h2>3. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des éléments présents sur ce site (textes, images,
        graphismes, logo, icônes, sons, logiciels, etc.) est la propriété
        exclusive de {LEGAL_ENTITY.denomination} ou de ses partenaires, et est
        protégé par les lois françaises et internationales relatives à la
        propriété intellectuelle.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication,
        adaptation de tout ou partie des éléments du site, quel que soit le
        moyen ou le procédé utilisé, est interdite sauf autorisation écrite
        préalable de {LEGAL_ENTITY.denomination}.
      </p>
      <p>
        Les marques et logos des fabricants partenaires (Daikin, Mitsubishi
        Electric, Atlantic, etc.) restent la propriété exclusive de leurs
        détenteurs respectifs et sont reproduits sur ce site uniquement à des
        fins informatives.
      </p>

      <h2>4. Liens hypertextes</h2>
      <p>
        Le site peut contenir des liens hypertextes vers d&apos;autres sites.
        {LEGAL_ENTITY.denomination} n&apos;exerce aucun contrôle sur ces sites
        tiers et ne saurait être tenue responsable de leur contenu, de leur
        disponibilité ou de l&apos;usage qui pourrait en être fait.
      </p>

      <h2>5. Limitation de responsabilité</h2>
      <p>
        {LEGAL_ENTITY.denomination} met tout en œuvre pour offrir aux
        utilisateurs des informations et/ou outils disponibles et vérifiés, mais
        ne saurait être tenue pour responsable des erreurs ou de toute absence
        ou indisponibilité d&apos;informations.
      </p>
      <p>
        Les informations diffusées sur ce site sont présentées à titre
        purement indicatif et ne sauraient constituer une offre commerciale
        ferme. Toute commande engageante fait l&apos;objet d&apos;un devis
        signé entre les parties.
      </p>

      <h2>6. Données personnelles</h2>
      <p>
        Le traitement des données personnelles collectées sur ce site est
        détaillé dans notre{" "}
        <a href="/politique-confidentialite">politique de confidentialité</a>.
        Les messages transmis via le formulaire de contact sont acheminés par
        le prestataire{" "}
        <a
          href={EMAIL_PROVIDER.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {EMAIL_PROVIDER.name}
        </a>
        .
      </p>

      <h2>7. Droit applicable</h2>
      <p>
        Les présentes mentions légales sont régies par le droit français. En
        cas de litige, les tribunaux français seront seuls compétents.
      </p>
    </LegalPageLayout>
  );
}
