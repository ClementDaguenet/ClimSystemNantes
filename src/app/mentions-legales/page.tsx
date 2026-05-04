import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { getFeaturedAgency } from "@/lib/cms/loaders";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site Climsystem Distribution Atlantique : éditeur, hébergeur, propriété intellectuelle et conditions d'utilisation.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default async function MentionsLegalesPage() {
  const featuredAgency = await getFeaturedAgency();

  return (
    <LegalPageLayout
      eyebrow="Informations légales"
      title="Mentions légales"
      description="Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique (LCEN)."
      lastUpdated="30 avril 2026"
    >
      <h2>1. Éditeur du site</h2>
      <p>
        Le présent site, accessible à l&apos;adresse{" "}
        <strong>www.climsystem.fr</strong>, est édité par :
      </p>
      <div className="definitions">
        <div>
          <strong>Raison sociale&nbsp;:</strong> Climsystem Distribution
          Atlantique
        </div>
        <div>
          <strong>Forme juridique&nbsp;:</strong> [SAS / SARL - à compléter]
        </div>
        <div>
          <strong>Capital social&nbsp;:</strong> [à compléter] €
        </div>
        <div>
          <strong>Siège social&nbsp;:</strong> [adresse du siège social - à
          compléter conformément aux statuts de la société]
        </div>
        <div>
          <strong>Contact agence Nantes (site web)&nbsp;:</strong>{" "}
          {featuredAgency.address}, {featuredAgency.postalCode}{" "}
          {featuredAgency.city}
        </div>
        <div>
          <strong>SIRET&nbsp;:</strong> [à compléter]
        </div>
        <div>
          <strong>RCS&nbsp;:</strong> [Ville d&apos;immatriculation -
          à compléter] - [Numéro à compléter]
        </div>
        <div>
          <strong>N° TVA intracommunautaire&nbsp;:</strong> [FRXX XXXXXXXXX]
        </div>
        <div>
          <strong>Téléphone&nbsp;:</strong>{" "}
          <a href={`tel:${featuredAgency.phone.replace(/\s/g, "")}`}>
            {featuredAgency.phone}
          </a>
        </div>
        <div>
          <strong>Email&nbsp;:</strong>{" "}
          <a href={`mailto:${featuredAgency.email}`}>{featuredAgency.email}</a>
        </div>
        <div>
          <strong>Directeur de la publication&nbsp;:</strong> [Nom Prénom - à
          compléter]
        </div>
      </div>

      <h2>2. Hébergeur du site</h2>
      <p>Le site est hébergé par&nbsp;:</p>
      <div className="definitions">
        <div>
          <strong>Hébergeur&nbsp;:</strong> [Nom de l&apos;hébergeur - ex.
          Netlify Inc.]
        </div>
        <div>
          <strong>Adresse&nbsp;:</strong> [Adresse complète - à compléter]
        </div>
        <div>
          <strong>Site web&nbsp;:</strong>{" "}
          <a
            href="https://www.netlify.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            [URL du site de l&apos;hébergeur]
          </a>
        </div>
      </div>

      <h2>3. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des éléments présents sur ce site (textes, images,
        graphismes, logo, icônes, sons, logiciels, etc.) est la propriété
        exclusive de Climsystem Distribution Atlantique ou de ses partenaires,
        et est protégé par les lois françaises et internationales relatives à
        la propriété intellectuelle.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication,
        adaptation de tout ou partie des éléments du site, quel que soit le
        moyen ou le procédé utilisé, est interdite sauf autorisation écrite
        préalable de Climsystem Distribution Atlantique.
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
        Climsystem Distribution Atlantique n&apos;exerce aucun contrôle sur ces
        sites tiers et ne saurait être tenue responsable de leur contenu, de
        leur disponibilité ou de l&apos;usage qui pourrait en être fait.
      </p>

      <h2>5. Limitation de responsabilité</h2>
      <p>
        Climsystem Distribution Atlantique met tout en œuvre pour offrir aux
        utilisateurs des informations et/ou outils disponibles et vérifiés,
        mais ne saurait être tenue pour responsable des erreurs ou de toute
        absence ou indisponibilité d&apos;informations.
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
      </p>

      <h2>7. Droit applicable</h2>
      <p>
        Les présentes mentions légales sont régies par le droit français. En
        cas de litige, les tribunaux français seront seuls compétents.
      </p>
    </LegalPageLayout>
  );
}
