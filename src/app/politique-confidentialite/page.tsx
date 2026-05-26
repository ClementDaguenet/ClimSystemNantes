import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { getFeaturedAgency } from "@/lib/cms/loaders";
import {
  ANALYTICS_PROVIDER,
  DATABASE_HOSTING,
  EMAIL_PROVIDER,
  HOSTING,
  LEGAL_ENTITY,
} from "@/lib/legal/company";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du site Climsystem Distribution Atlantique : traitement des données personnelles, cookies et droits RGPD.",
  alternates: { canonical: "/politique-confidentialite" },
  robots: { index: true, follow: true },
};

export default async function PolitiqueConfidentialitePage() {
  const featuredAgency = await getFeaturedAgency();

  return (
    <LegalPageLayout
      eyebrow="RGPD"
      title="Politique de confidentialité"
      description="Climsystem Distribution Atlantique s'engage à protéger la vie privée des visiteurs de son site et à traiter leurs données conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés."
      lastUpdated="26 mai 2026"
    >
      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données personnelles est la société{" "}
        <strong>{LEGAL_ENTITY.denomination}</strong> ({LEGAL_ENTITY.legalForm}),
        éditrice du site sous l&apos;enseigne{" "}
        <strong>{LEGAL_ENTITY.commercialName}</strong>.
      </p>
      <div className="definitions">
        <div>
          <strong>Siège social&nbsp;:</strong> {LEGAL_ENTITY.headquarters}
        </div>
        <div>
          <strong>SIREN&nbsp;:</strong> {LEGAL_ENTITY.siren}
        </div>
      </div>
      <p>
        Pour toute question concernant la présente politique ou l&apos;exercice
        de vos droits, vous pouvez contacter notre agence de{" "}
        <strong>{featuredAgency.city}</strong> ({featuredAgency.address},{" "}
        {featuredAgency.postalCode} {featuredAgency.city}), par email à{" "}
        <a href={`mailto:${featuredAgency.email}`}>{featuredAgency.email}</a>{" "}
        ou au téléphone{" "}
        <a href={`tel:${featuredAgency.phone.replace(/\s/g, "")}`}>
          {featuredAgency.phone}
        </a>
        .
      </p>

      <h2>2. Données collectées et finalités</h2>
      <p>
        Nous ne collectons que les données strictement nécessaires aux
        finalités décrites ci-dessous.
      </p>

      <h3>2.1. Formulaire de contact</h3>
      <p>
        Lorsque vous remplissez notre formulaire de contact, nous collectons
        les données suivantes :
      </p>
      <ul>
        <li>Nom complet</li>
        <li>Adresse email</li>
        <li>Numéro de téléphone</li>
        <li>Sujet et contenu de votre demande</li>
      </ul>
      <p>
        <strong>Finalité&nbsp;:</strong> traiter votre demande commerciale,
        technique ou SAV et y apporter une réponse dans les meilleurs délais.
      </p>
      <p>
        <strong>Base légale&nbsp;:</strong> votre consentement (article 6.1.a
        du RGPD), recueilli via la case dédiée du formulaire.
      </p>
      <p>
        <strong>Destinataire technique&nbsp;:</strong> les messages sont
        transmis par email via{" "}
        <a
          href={EMAIL_PROVIDER.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {EMAIL_PROVIDER.name}
        </a>{" "}
        vers l&apos;adresse professionnelle configurée pour l&apos;agence.
        Votre adresse email est utilisée comme adresse de réponse (
        <em>reply-to</em>).
      </p>

      <h3>2.2. Données de navigation et mesure d&apos;audience</h3>
      <p>
        Si vous acceptez les cookies de mesure d&apos;audience via le bandeau
        affiché lors de votre première visite,{" "}
        <strong>{ANALYTICS_PROVIDER.name}</strong> peut collecter des données
        anonymisées (pages consultées, durée de visite, type d&apos;appareil,
        origine géographique approximative). L&apos;adresse IP est anonymisée.
      </p>
      <p>
        <strong>Finalité&nbsp;:</strong> comprendre l&apos;usage du site et
        améliorer nos contenus.
      </p>
      <p>
        <strong>Base légale&nbsp;:</strong> votre consentement (article 6.1.a
        du RGPD). Refuser les cookies analytics n&apos;empêche pas la
        navigation.
      </p>
      <p>
        Si la variable{" "}
        <code className="rounded bg-clim-blue-50 px-1.5 py-0.5 text-sm">
          NEXT_PUBLIC_GA_MEASUREMENT_ID
        </code>{" "}
        n&apos;est pas configurée sur le serveur, aucun outil de mesure
        d&apos;audience n&apos;est chargé.
      </p>

      <h3>2.3. Données techniques (hébergement)</h3>
      <p>
        Lors de votre navigation, certaines données techniques peuvent être
        enregistrées par notre hébergeur ({HOSTING.name}) et notre fournisseur
        de base de données ({DATABASE_HOSTING.name}) dans des fichiers de log
        (adresse IP, navigateur, pages consultées, date et heure). Ces données
        sont utilisées uniquement à des fins de sécurité, de maintenance et de
        diagnostic technique.
      </p>

      <h3>2.4. Back-office administrateur</h3>
      <p>
        L&apos;espace <code className="rounded bg-clim-blue-50 px-1.5 py-0.5 text-sm">/admin</code>{" "}
        est réservé au personnel autorisé de Climsystem. Aucune donnée
        personnelle de visiteur n&apos;y est créée ; seul un cookie de session
        sécurisé (JWT) est déposé pour les administrateurs connectés.
      </p>

      <h2>3. Durée de conservation</h2>
      <ul>
        <li>
          <strong>Demandes via le formulaire&nbsp;:</strong> 3 ans à compter
          du dernier contact, conformément aux recommandations de la CNIL
          pour la prospection commerciale B2B.
        </li>
        <li>
          <strong>Données analytics&nbsp;:</strong> 14 mois maximum
          (paramétrage Google Analytics 4).
        </li>
        <li>
          <strong>Préférence cookies&nbsp;:</strong> 13 mois dans le
          stockage local de votre navigateur (
          <code className="rounded bg-clim-blue-50 px-1.5 py-0.5 text-sm">
            clims_cookie_consent
          </code>
          ).
        </li>
        <li>
          <strong>Logs techniques&nbsp;:</strong> 12 mois maximum.
        </li>
      </ul>

      <h2>4. Destinataires et sous-traitants</h2>
      <p>
        Vos données ne sont transmises qu&apos;aux services internes de
        Climsystem en charge du traitement de votre demande (commercial,
        technique, SAV). Elles ne sont en aucun cas revendues à des tiers.
      </p>
      <p>Sous-traitants techniques intervenant pour le site :</p>
      <ul>
        <li>
          <strong>{HOSTING.name}</strong> - hébergement du site web (
          <a href={HOSTING.website} target="_blank" rel="noopener noreferrer">
            vercel.com
          </a>
          )
        </li>
        <li>
          <strong>{DATABASE_HOSTING.name}</strong> - stockage CMS (
          <a
            href={DATABASE_HOSTING.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            supabase.com
          </a>
          )
        </li>
        <li>
          <strong>{EMAIL_PROVIDER.name}</strong> - envoi des emails de contact
          (
          <a
            href={EMAIL_PROVIDER.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            resend.com
          </a>
          )
        </li>
        <li>
          <strong>{ANALYTICS_PROVIDER.name}</strong> - mesure d&apos;audience,
          uniquement si vous avez accepté les cookies (
          <a
            href={ANALYTICS_PROVIDER.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            analytics.google.com
          </a>
          )
        </li>
      </ul>
      <p>
        Certains sous-traitants peuvent être établis hors Union européenne
        (États-Unis). Dans ce cas, des garanties appropriées (clauses
        contractuelles types de la Commission européenne) encadrent les
        transferts.
      </p>

      <h2>5. Cookies</h2>
      <p>
        Lors de votre première visite, un bandeau vous informe de l&apos;usage
        des cookies et recueille votre choix.
      </p>

      <h3>5.1. Cookies strictement nécessaires</h3>
      <p>
        Ces cookies ne requièrent pas de consentement. Ils incluent notamment
        le cookie de session administrateur (<code className="rounded bg-clim-blue-50 px-1.5 py-0.5 text-sm">clims_admin_session</code>)
        et le cookie de limitation d&apos;envoi du formulaire de contact.
      </p>

      <h3>5.2. Cookies de mesure d&apos;audience (avec consentement)</h3>
      <p>
        Si vous cliquez sur «&nbsp;Accepter&nbsp;», Google Analytics 4 peut
        déposer des cookies (_ga, _ga_*). Vous pouvez retirer votre
        consentement en effaçant les données du site dans les paramètres de
        votre navigateur.
      </p>

      <h3>5.3. Gérer vos préférences</h3>
      <p>
        Pour modifier votre choix, effacez le stockage local du site dans votre
        navigateur : le bandeau réapparaîtra à la prochaine visite. Vous pouvez
        également configurer votre navigateur pour bloquer les cookies.
      </p>

      <h2>6. Vos droits</h2>
      <p>
        Conformément au RGPD et à la loi Informatique et Libertés, vous
        disposez des droits suivants sur vos données :
      </p>
      <ul>
        <li>
          <strong>Droit d&apos;accès&nbsp;:</strong> obtenir une copie des
          données vous concernant.
        </li>
        <li>
          <strong>Droit de rectification&nbsp;:</strong> faire corriger des
          données inexactes ou incomplètes.
        </li>
        <li>
          <strong>Droit à l&apos;effacement&nbsp;:</strong> demander la
          suppression de vos données (« droit à l&apos;oubli »).
        </li>
        <li>
          <strong>Droit à la limitation&nbsp;:</strong> demander le gel
          temporaire de l&apos;utilisation de vos données.
        </li>
        <li>
          <strong>Droit d&apos;opposition&nbsp;:</strong> vous opposer à
          l&apos;utilisation de vos données pour un motif légitime.
        </li>
        <li>
          <strong>Droit à la portabilité&nbsp;:</strong> récupérer vos données
          dans un format structuré.
        </li>
        <li>
          <strong>Droit de retrait du consentement&nbsp;:</strong> à tout
          moment, sans affecter la légalité des traitements antérieurs.
        </li>
      </ul>
      <p>
        Pour exercer ces droits, contactez-nous par email à{" "}
        <a href={`mailto:${featuredAgency.email}`}>{featuredAgency.email}</a> en
        joignant un justificatif d&apos;identité. Nous y répondrons dans un
        délai d&apos;un mois maximum.
      </p>

      <h2>7. Réclamation auprès de la CNIL</h2>
      <p>
        Si vous estimez, après nous avoir contactés, que vos droits sur vos
        données ne sont pas respectés, vous pouvez introduire une réclamation
        auprès de la Commission Nationale de l&apos;Informatique et des
        Libertés (CNIL) - 3 Place de Fontenoy, 75007 Paris -{" "}
        <a
          href="https://www.cnil.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.cnil.fr
        </a>
        .
      </p>

      <h2>8. Modification de la politique</h2>
      <p>
        Cette politique de confidentialité peut être mise à jour à tout moment
        pour tenir compte des évolutions légales ou de nos pratiques. La date
        de dernière mise à jour est indiquée en tête de page.
      </p>
    </LegalPageLayout>
  );
}
