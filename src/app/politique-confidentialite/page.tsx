import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { getFeaturedAgency } from "@/lib/cms/loaders";

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
      description="Climsystem Distribution Atlantique s'engage à protéger la vie privée des visiteurs de son site et à traiter leurs données conformément au Règlement Général sur la Protection des Données (RGPD)."
      lastUpdated="30 avril 2026"
    >
      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données personnelles est{" "}
        <strong>Climsystem Distribution Atlantique</strong>. Le siège social de
        la société est indiqué dans les mentions légales&nbsp;; il peut être
        distinct de l&apos;adresse ci-dessous.
      </p>
      <p>
        Pour toute question concernant la présente politique ou l&apos;exercice
        de vos droits, vous pouvez contacter notre agence de{" "}
        <strong>{featuredAgency.city}</strong>{" "}
        ({featuredAgency.address}, {featuredAgency.postalCode}{" "}
        {featuredAgency.city}), par email à{" "}
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

      <h3>2.2. Données de navigation</h3>
      <p>
        Lors de votre navigation, certaines données techniques peuvent être
        enregistrées par notre hébergeur dans des fichiers de log
        (adresse IP, navigateur, pages consultées, date et heure). Ces données
        sont utilisées uniquement à des fins de sécurité et de diagnostic
        technique.
      </p>

      <h2>3. Durée de conservation</h2>
      <ul>
        <li>
          <strong>Demandes via le formulaire&nbsp;:</strong> 3 ans à compter
          du dernier contact, conformément aux recommandations de la CNIL
          pour la prospection commerciale.
        </li>
        <li>
          <strong>Logs techniques&nbsp;:</strong> 12 mois maximum.
        </li>
      </ul>

      <h2>4. Destinataires des données</h2>
      <p>
        Vos données ne sont transmises qu&apos;aux services internes de
        Climsystem Distribution Atlantique en charge du traitement de votre
        demande (commercial, technique, SAV). Elles ne sont en aucun cas
        revendues à des tiers.
      </p>
      <p>
        Certains sous-traitants techniques (hébergeur, fournisseur de
        messagerie) peuvent avoir accès à ces données dans le cadre strict de
        leur prestation. Tous nos sous-traitants sont conformes au RGPD.
      </p>

      <h2>5. Cookies</h2>
      <p>
        Ce site n&apos;utilise <strong>aucun cookie de mesure d&apos;audience
        ni de tracking publicitaire</strong>. Seuls les cookies strictement
        nécessaires au fonctionnement technique du site (préférences de
        navigation) peuvent être utilisés, sans consentement requis selon
        l&apos;article 82 de la loi Informatique et Libertés.
      </p>
      <p>
        Si nous venions à intégrer ultérieurement des outils de mesure
        d&apos;audience (ex. Google Analytics, Matomo), un bandeau de
        consentement conforme aux recommandations CNIL serait mis en place.
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
        Libertés (CNIL) — 3 Place de Fontenoy, 75007 Paris —{" "}
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
