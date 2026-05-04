export type ContentSeedRow = {
  key: string;
  label: string;
  group: string;
  value: string;
};

/** Textes éditables du site ; ordre utilisé dans l’admin par groupe */
export const CONTENT_SEED_ROWS: ContentSeedRow[] = [
  {
    group: "Site - Médias & partage (SEO)",
    key: "media.og.image_url",
    label:
      "Image Open Graph / aperçu réseaux sociaux - URL absolue recommandée (https://…). Laisser vide pour ne pas définir d’image dédiée.",
    value: "",
  },

  {
    group: "Accueil - Hero",
    key: "hero.badge",
    label: "Badge (ligne courte)",
    value: "Distribution Atlantique · À Nantes",
  },
  {
    group: "Accueil - Hero",
    key: "hero.h1_lead",
    label: "Titre H1 - avant le surlignage",
    value: "Le génie climatique,",
  },
  {
    group: "Accueil - Hero",
    key: "hero.h1_highlight",
    label: "Titre H1 - partie mise en valeur",
    value: "pensé pour les pros",
  },
  {
    group: "Accueil - Hero",
    key: "hero.subtitle",
    label: "Sous-titre",
    value:
      "Distributeur indépendant en chauffage, climatisation, ventilation et hygrométrie. Une équipe engagée à Nantes, avec trois agences relais (Châtillon, Tours, Aubagne) pour tout le territoire.",
  },
  {
    group: "Accueil - Hero",
    key: "hero.cta_primary",
    label: "Bouton principal",
    value: "Découvrir nos solutions",
  },
  {
    group: "Accueil - Hero",
    key: "hero.cta_secondary",
    label: "Bouton secondaire",
    value: "Demander un devis",
  },
  {
    group: "Accueil - Hero",
    key: "hero.stat_years",
    label: "Légende stat - années",
    value: "Années d'expertise",
  },
  {
    group: "Accueil - Hero",
    key: "hero.stat_implants",
    label: "Légende stat - implantations",
    value: "Implantations en France",
  },
  {
    group: "Accueil - Hero",
    key: "hero.stat_brands",
    label: "Légende stat - marques",
    value: "Marques distribuées",
  },

  {
    group: "Accueil - Présentation",
    key: "presentation.eyebrow",
    label: "Sur-titre rubrique",
    value: "Présentation de la société",
  },
  {
    group: "Accueil - Présentation",
    key: "presentation.title",
    label: "Titre principal",
    value: "Plus de 25 ans d'expertise en traitement d'air",
  },
  {
    group: "Accueil - Présentation",
    key: "presentation.p1",
    label: "Paragraphe 1",
    value:
      "Depuis plus de 25 ans, la société Climsystem est spécialiste en distribution de matériel de traitement d'air.",
  },
  {
    group: "Accueil - Présentation",
    key: "presentation.p2",
    label: "Paragraphe 2",
    value:
      "Elle accompagne ses partenaires installateurs, mainteneurs, architectes et bureaux d'études afin de les conseiller dans leurs projets, qu'ils soient résidentiels, tertiaires ou industriels.",
  },
  {
    group: "Accueil - Présentation",
    key: "presentation.p3",
    label: "Paragraphe 3",
    value:
      "Une solution adéquate vous sera proposée en chauffage, rafraîchissement, humidification, déshumidification, déshydratation et renouvellement d'air.",
  },
  {
    group: "Accueil - Présentation",
    key: "presentation.stat_caption",
    label: "Carte bleue - sous le chiffre 25",
    value: "Années d'expertise",
  },
  {
    group: "Accueil - Présentation",
    key: "presentation.partners_heading",
    label: "Titre bloc partenaires",
    value: "Nos partenaires",
  },
  {
    group: "Accueil - Présentation",
    key: "presentation.partners",
    label:
      "Libellés partenaires (4 libellés, séparateur | - ordre : HardHat, Briefcase, PenTool, Building2)",
    value: "Installateurs|Mainteneurs|Architectes|Bureaux d'études",
  },
  {
    group: "Accueil - Présentation",
    key: "presentation.expertise_heading",
    label: "Titre bloc expertises",
    value: "Domaines d'expertise",
  },
  {
    group: "Accueil - Présentation",
    key: "presentation.expertise",
    label: "Liste expertises (une par ligne)",
    value:
      "Chauffage\nRafraîchissement\nHumidification\nDéshumidification\nDéshydratation\nRenouvellement d'air",
  },

  {
    group: "Accueil - Atouts",
    key: "home.atouts.eyebrow",
    label: "Sur-titre",
    value: "Nos principaux atouts",
  },
  {
    group: "Accueil - Atouts",
    key: "home.atouts.title",
    label: "Titre",
    value: "Pourquoi choisir Climsystem ?",
  },
  {
    group: "Accueil - Atouts",
    key: "home.atouts.desc",
    label: "Description",
    value:
      "Plus qu'un simple distributeur, un partenaire qui s'engage à vos côtés sur l'ensemble du cycle de vos projets - du chiffrage initial à la mise en service.",
  },

  {
    group: "Accueil - Solutions (cartes)",
    key: "home.solutions_preview.eyebrow",
    label: "Sur-titre",
    value: "Catalogue",
  },
  {
    group: "Accueil - Solutions (cartes)",
    key: "home.solutions_preview.title",
    label: "Titre",
    value: "Six familles de solutions techniques",
  },
  {
    group: "Accueil - Solutions (cartes)",
    key: "home.solutions_preview.desc",
    label: "Description",
    value:
      "Du résidentiel au tertiaire, en passant par l'industriel et le patrimonial : nous distribuons une gamme exhaustive pour répondre à tous vos chantiers.",
  },

  {
    group: "Accueil - CTA",
    key: "home.cta.title",
    label: "Titre",
    value: "Un projet ? Une question technique ?",
  },
  {
    group: "Accueil - CTA",
    key: "home.cta.subtitle",
    label: "Texte sous le titre",
    value:
      "Nos équipes sont à votre disposition dans nos 4 agences pour vous conseiller, chiffrer et accompagner vos chantiers.",
  },
  {
    group: "Accueil - CTA",
    key: "home.cta.btn_agencies",
    label: "Bouton Agences",
    value: "Voir les agences",
  },
  {
    group: "Accueil - CTA",
    key: "home.cta.btn_contact",
    label: "Bouton Contact",
    value: "Nous contacter",
  },

  {
    group: "Accueil - Marques",
    key: "home.brands.title",
    label: "Titre",
    value: "Plus de 33 marques",
  },
  {
    group: "Accueil - Marques",
    key: "home.brands.subtitle",
    label: "Sous-titre",
    value: "Distribuées dans nos agences · D'autres références sur demande",
  },

  {
    group: "Accueil - Nantes",
    key: "home.nantes.badge",
    label: "Badge ligne haute",
    value: "Notre équipe à Nantes",
  },
  {
    group: "Accueil - Nantes",
    key: "home.nantes.title_before_gradient",
    label: "Titre H2 - avant la partie dégradée",
    value: "Climsystem Distribution Atlantique,",
  },
  {
    group: "Accueil - Nantes",
    key: "home.nantes.title_gradient",
    label: "Titre H2 - partie dégradée",
    value: "c'est votre agence à Nantes.",
  },
  {
    group: "Accueil - Nantes",
    key: "home.nantes.tagline_fallback",
    label: "Texte de remplacement si l’agence n’a pas de baseline (carte données)",
    value:
      "Accompagnement technique, conseil projet et disponibilité des références pour votre zone Ouest.",
  },
  {
    group: "Accueil - Nantes",
    key: "home.nantes.paragraph_secondary",
    label: "2e paragraphe (après baseline agence)",
    value:
      "Ce site reflète avant tout cette dynamique atlantique. Nos relais à Châtillon, Tours et Aubagne complètent le maillage national pour vos livraisons et la proximité terrain.",
  },
  {
    group: "Accueil - Nantes",
    key: "home.nantes.btn_nantes",
    label: "Bouton principal",
    value: "Découvrir l'agence de Nantes",
  },
  {
    group: "Accueil - Nantes",
    key: "home.nantes.btn_all",
    label: "Bouton secondaire",
    value: "Voir toutes les agences",
  },
  {
    group: "Accueil - Nantes",
    key: "home.nantes.card_badge",
    label: "Carte coordonnées - badge",
    value: "Coordonnées Nantes",
  },

  {
    group: "Accueil - Médias (images)",
    key: "media.hero.image_url",
    label:
      "Image Hero (colonne droite, grands écrans) - chemin depuis le site public (ex. /visuels/hero.webp) ou URL HTTPS. Vide = illustration géométrique actuelle.",
    value: "",
  },
  {
    group: "Accueil - Médias (images)",
    key: "media.hero.image_alt",
    label: "Texte alternatif Hero (SEO & accessibilité)",
    value: "Installation et solutions de génie climatique - Climsystem",
  },

  {
    group: "Page Solutions",
    key: "page.solutions.hero_eyebrow",
    label: "Sur-titre hero",
    value: "Catalogue Climsystem Distribution Atlantique",
  },
  {
    group: "Page Solutions",
    key: "page.solutions.hero_title",
    label: "Titre hero",
    value: "Solutions en génie climatique",
  },
  {
    group: "Page Solutions",
    key: "page.solutions.hero_subtitle",
    label: "Sous-texte hero",
    value:
      "Du chauffage à la ventilation, en passant par la climatisation et l'hygrométrie, nous distribuons l'ensemble des solutions techniques nécessaires à vos chantiers, du résidentiel au tertiaire.",
  },

  {
    group: "Page Solutions - Médias (images)",
    key: "media.solutions.chauffage.image_url",
    label:
      "Chauffage - photo (grande carte à droite / gauche). Chemin /public/… ou URL HTTPS. Vide = pictogramme par défaut.",
    value: "",
  },
  {
    group: "Page Solutions - Médias (images)",
    key: "media.solutions.chauffage.image_alt",
    label: "Chauffage - texte alternatif",
    value:
      "Installation d'une pompe à chaleur extérieure dans un environnement résidentiel",
  },
  {
    group: "Page Solutions - Médias (images)",
    key: "media.solutions.climatisation.image_url",
    label:
      "Climatisation - photo. Chemin /public/… ou URL HTTPS. Vide = pictogramme par défaut.",
    value: "",
  },
  {
    group: "Page Solutions - Médias (images)",
    key: "media.solutions.climatisation.image_alt",
    label: "Climatisation - texte alternatif",
    value:
      "Unité intérieure de climatisation murale dans un bureau moderne lumineux",
  },
  {
    group: "Page Solutions - Médias (images)",
    key: "media.solutions.diffusion.image_url",
    label:
      "Diffusion d'air - photo. Chemin /public/… ou URL HTTPS. Vide = pictogramme par défaut.",
    value: "",
  },
  {
    group: "Page Solutions - Médias (images)",
    key: "media.solutions.diffusion.image_alt",
    label: "Diffusion d'air - texte alternatif",
    value:
      "Diffuseur d'air plafonnier circulaire installé au plafond d'un open-space",
  },
  {
    group: "Page Solutions - Médias (images)",
    key: "media.solutions.hygrometrie.image_url",
    label:
      "Hygrométrie - photo. Chemin /public/… ou URL HTTPS. Vide = pictogramme par défaut.",
    value: "",
  },
  {
    group: "Page Solutions - Médias (images)",
    key: "media.solutions.hygrometrie.image_alt",
    label: "Hygrométrie - texte alternatif",
    value:
      "Humidificateur industriel installé dans un local technique avec tuyauterie inox",
  },
  {
    group: "Page Solutions - Médias (images)",
    key: "media.solutions.ventilation.image_url",
    label:
      "Ventilation - photo. Chemin /public/… ou URL HTTPS. Vide = pictogramme par défaut.",
    value: "",
  },
  {
    group: "Page Solutions - Médias (images)",
    key: "media.solutions.ventilation.image_alt",
    label: "Ventilation - texte alternatif",
    value:
      "Centrale de traitement d'air double flux installée en toiture d'un bâtiment tertiaire",
  },
  {
    group: "Page Solutions - Médias (images)",
    key: "media.solutions.accessoires.image_url",
    label:
      "Accessoires - photo. Chemin /public/… ou URL HTTPS. Vide = pictogramme par défaut.",
    value: "",
  },
  {
    group: "Page Solutions - Médias (images)",
    key: "media.solutions.accessoires.image_alt",
    label: "Accessoires - texte alternatif",
    value:
      "Plan de travail d'un atelier avec outillage de frigoriste et pièces détachées",
  },

  {
    group: "Page Contact",
    key: "page.contact.hero_eyebrow",
    label: "Sur-titre hero",
    value: "Parlons de votre projet",
  },
  {
    group: "Page Contact",
    key: "page.contact.hero_title",
    label: "Titre hero",
    value: "Contactez nos équipes",
  },
  {
    group: "Page Contact",
    key: "page.contact.hero_subtitle",
    label: "Sous-texte hero",
    value:
      "Une question technique, un besoin de chiffrage, une intervention SAV ? Remplissez le formulaire ou appelez directement l'agence la plus proche.",
  },
  {
    group: "Page Contact",
    key: "page.contact.sidebar_title",
    label: "Colonne gauche - titre",
    value: "Coordonnées",
  },
  {
    group: "Page Contact",
    key: "page.contact.sidebar_intro",
    label: "Colonne gauche - intro",
    value:
      "Notre service commercial est disponible du lundi au vendredi, de 8h à 18h.",
  },
  {
    group: "Page Contact",
    key: "page.contact.featured_badge",
    label: "Encadré Nantes - badge",
    value: "Nantes - équipe Distribution Atlantique",
  },
  {
    group: "Page Contact",
    key: "page.contact.other_heading",
    label: "Bloc autres agences - titre",
    value: "Autres agences",
  },
  {
    group: "Page Contact",
    key: "page.contact.form_heading",
    label: "Titre formulaire",
    value: "Formulaire de contact",
  },
  {
    group: "Page Contact",
    key: "page.contact.form_fallback",
    label: "Message chargement Suspense",
    value: "Chargement du formulaire…",
  },

  {
    group: "Page Agences",
    key: "page.agences.hero_eyebrow",
    label: "Sur-titre hero",
    value: "Nos implantations",
  },
  {
    group: "Page Agences",
    key: "page.agences.hero_title_before",
    label: "Titre H1 - avant la partie accent",
    value: "Nantes au cœur de l'Atlantique,",
  },
  {
    group: "Page Agences",
    key: "page.agences.hero_title_accent",
    label: "Titre H1 - partie accent rouge",
    value: "3 agences relais",
  },
  {
    group: "Page Agences",
    key: "page.agences.hero_subtitle",
    label: "Sous-texte hero",
    value:
      "Une présence pensée pour la proximité : l'équipe nantaise concentre bureau d'études et dépôt régional ; nos implantations de Châtillon, Tours et Aubagne renforcent la réactivité vers la région parisienne, le Centre et le Sud.",
  },
  {
    group: "Page Agences",
    key: "page.agences.nantes.section_eyebrow",
    label: "Section Nantes - sur-titre",
    value: "Notre équipe sur la façade atlantique",
  },
  {
    group: "Page Agences",
    key: "page.agences.nantes.section_title",
    label: "Section Nantes - titre",
    value: "Nantes : votre agence de référence",
  },
  {
    group: "Page Agences",
    key: "page.agences.nantes.section_description",
    label: "Section Nantes - description",
    value:
      "Bureau d'études, conseil technique et disponibilité stock pour les professionnels de l'Ouest.",
  },
  {
    group: "Page Agences",
    key: "page.agences.satellites.section_eyebrow",
    label: "Section relais - sur-titre",
    value: "Nos relais en France",
  },
  {
    group: "Page Agences",
    key: "page.agences.satellites.section_title",
    label: "Section relais - titre",
    value: "Châtillon · Tours · Aubagne",
  },
  {
    group: "Page Agences",
    key: "page.agences.satellites.section_description",
    label: "Section relais - description",
    value:
      "Trois agences satellites pour assurer le maillage territorial et la disponibilité des stocks à proximité de vos chantiers.",
  },
  {
    group: "Page Agences",
    key: "page.agences.map.section_eyebrow",
    label: "Section carte - sur-titre",
    value: "Carte interactive",
  },
  {
    group: "Page Agences",
    key: "page.agences.map.section_title",
    label: "Section carte - titre",
    value: "Localisez nos agences",
  },
  {
    group: "Page Agences",
    key: "page.agences.map.section_description",
    label: "Section carte - description",
    value:
      "L'agence de Nantes est signalée par une étoile rouge ; cliquez sur un marqueur pour afficher les coordonnées.",
  },

  {
    group: "Page SAV",
    key: "page.sav.hero_badge",
    label: "Badge hero",
    value: "Service Après-Vente",
  },
  {
    group: "Page SAV",
    key: "page.sav.hero_h1_before",
    label: "H1 - avant partie forte",
    value: "Un SAV ",
  },
  {
    group: "Page SAV",
    key: "page.sav.hero_strong",
    label: "H1 - partie en gras",
    value: "toutes marques",
  },
  {
    group: "Page SAV",
    key: "page.sav.hero_h1_after",
    label: "H1 - après partie forte",
    value: ", réponse sous 24/48h",
  },
  {
    group: "Page SAV",
    key: "page.sav.hero_intro",
    label: "Texte sous le titre",
    value:
      "En cas de panne ou de question technique, notre équipe SAV met tout en œuvre pour rétablir le confort de vos clients dans les meilleurs délais - quelle que soit la marque du matériel.",
  },
  {
    group: "Page SAV - cartouches",
    key: "page.sav.f1.title",
    label: "Cartouche 1 - titre",
    value: "Toutes marques",
  },
  {
    group: "Page SAV - cartouches",
    key: "page.sav.f1.desc",
    label: "Cartouche 1 - description",
    value:
      "Notre SAV intervient sur les références distribuées par Climsystem comme sur les autres marques du marché.",
  },
  {
    group: "Page SAV - cartouches",
    key: "page.sav.f2.title",
    label: "Cartouche 2 - titre",
    value: "Réponse 24/48h",
  },
  {
    group: "Page SAV - cartouches",
    key: "page.sav.f2.desc",
    label: "Cartouche 2 - description",
    value:
      "Engagement de réponse rapide pour vous permettre de tenir vos délais et préserver le confort de vos clients.",
  },
  {
    group: "Page SAV - cartouches",
    key: "page.sav.f3.title",
    label: "Cartouche 3 - titre",
    value: "Contact direct",
  },
  {
    group: "Page SAV - cartouches",
    key: "page.sav.f3.desc",
    label: "Cartouche 3 - description",
    value:
      "Alexis Colas, votre interlocuteur SAV dédié, joignable sur mobile et par email.",
  },

  {
    group: "Page SAV - flyer",
    key: "page.sav.section_flyer.eyebrow",
    label: "Sur-titre",
    value: "Documentation",
  },
  {
    group: "Page SAV - flyer",
    key: "page.sav.section_flyer.title",
    label: "Titre",
    value: "Notre flyer SAV",
  },
  {
    group: "Page SAV - flyer",
    key: "page.sav.section_flyer.desc",
    label: "Description",
    value:
      "Cliquez sur le visuel pour l'agrandir ou téléchargez la version PDF officielle.",
  },

  {
    group: "Page SAV - bloc contact bas",
    key: "page.sav.cta_bottom.eyebrow",
    label: "Sur-titre",
    value: "Contact SAV dédié",
  },
  {
    group: "Page SAV - bloc contact bas",
    key: "page.sav.cta_bottom.title_line1",
    label: "Titre ligne 1",
    value: "Une panne ? Une question ?",
  },
  {
    group: "Page SAV - bloc contact bas",
    key: "page.sav.cta_bottom.title_gradient",
    label: "Titre ligne dégradée",
    value: "Joignez Alexis directement.",
  },
  {
    group: "Page SAV - bloc contact bas",
    key: "page.sav.cta_bottom.intro",
    label: "Texte d’intro",
    value:
      "Notre interlocuteur SAV unique vous répond personnellement, sans serveur vocal ni transfert. Pour les demandes plus larges, passez par le formulaire pré-rempli.",
  },
  {
    group: "Page SAV - bloc contact bas",
    key: "page.sav.cta_bottom.btn_intervention",
    label: "Bouton intervention",
    value: "Demander une intervention",
  },
  {
    group: "Page SAV - bloc contact bas",
    key: "page.sav.cta_bottom.btn_agency",
    label: "Bouton agence",
    value: "Contacter mon agence",
  },

  {
    group: "Page SAV - encadré contact",
    key: "page.sav.sidebar.badge",
    label: "Libellé « Votre contact »",
    value: "Votre contact",
  },
  {
    group: "Page SAV - encadré contact",
    key: "page.sav.sidebar.name",
    label: "Nom affiché",
    value: "Alexis Colas",
  },
  {
    group: "Page SAV - encadré contact",
    key: "page.sav.sidebar.role",
    label: "Fonction",
    value: "Responsable SAV",
  },
  {
    group: "Page SAV - encadré contact",
    key: "page.sav.sidebar.phone",
    label: "Téléphone affiché (texte)",
    value: "06 31 95 16 94",
  },
  {
    group: "Page SAV - encadré contact",
    key: "page.sav.sidebar.phone_href",
    label: "Lien téléphone (tel:...) sans espaces",
    value: "0631951694",
  },
  {
    group: "Page SAV - encadré contact",
    key: "page.sav.sidebar.email",
    label: "Email affiché",
    value: "a.colas@climsystem.com",
  },
  {
    group: "Page SAV - encadré contact",
    key: "page.sav.sidebar.response_line",
    label: "Ligne horloge délai",
    value: "Réponse sous 24/48h",
  },

  {
    group: "Page SAV - accessibilité",
    key: "page.sav.a11y_features_heading",
    label: "Titre sr-only grille atouts",
    value: "Atouts du service après-vente",
  },
];

export const CONTENT_DEFAULT_BY_KEY: Record<string, string> =
  Object.fromEntries(CONTENT_SEED_ROWS.map((r) => [r.key, r.value]));

/** Libellés de groupes dans l’ordre d’affichage souhaité */
export function getContentGroupsInOrder(): string[] {
  const seen = new Set<string>();
  const order: string[] = [];
  for (const row of CONTENT_SEED_ROWS) {
    if (!seen.has(row.group)) {
      seen.add(row.group);
      order.push(row.group);
    }
  }
  return order;
}

/** Identifiant + titre de page métier dérivés du préfixe du groupe (navigation admin « Textes »). */
export function deriveContentPage(
  group: string,
): { id: string; title: string } {
  const g = group.trim();
  if (g.startsWith("Site")) return { id: "site", title: "Site (global)" };
  if (g.startsWith("Accueil")) return { id: "accueil", title: "Page d’accueil" };
  if (g.startsWith("Page Solutions"))
    return { id: "solutions", title: "Solutions" };
  if (g.startsWith("Page Contact")) return { id: "contact", title: "Contact" };
  if (g.startsWith("Page Agences")) return { id: "agences", title: "Agences" };
  if (g.startsWith("Page SAV")) return { id: "sav", title: "SAV" };
  return { id: "autres", title: "Autres" };
}

const CONTENT_PAGE_ORDER = [
  "site",
  "accueil",
  "solutions",
  "contact",
  "agences",
  "sav",
  "autres",
] as const;

/** Regroupe les sections CMS par page, dans un ordre de navigation lisible. */
export function getContentPagesInOrder(): {
  id: string;
  title: string;
  groups: string[];
}[] {
  const orderedGroups = getContentGroupsInOrder();
  const byId = new Map<
    string,
    { id: string; title: string; groups: string[] }
  >();
  for (const grp of orderedGroups) {
    const meta = deriveContentPage(grp);
    let bucket = byId.get(meta.id);
    if (!bucket) {
      bucket = { id: meta.id, title: meta.title, groups: [] };
      byId.set(meta.id, bucket);
    }
    bucket.groups.push(grp);
  }
  const ordered: { id: string; title: string; groups: string[] }[] = [];
  for (const id of CONTENT_PAGE_ORDER) {
    const b = byId.get(id);
    if (b?.groups.length) ordered.push(b);
    byId.delete(id);
  }
  for (const b of byId.values()) {
    if (b.groups.length) ordered.push(b);
  }
  return ordered;
}

/** Sections qui ne contiennent que des champs média (page admin Photos). */
export function getMediaContentGroupsInOrder(): string[] {
  return getContentGroupsInOrder().filter((groupName) =>
    CONTENT_SEED_ROWS.some(
      (r) => r.group === groupName && r.key.startsWith("media."),
    ),
  );
}

export function seedRowsForGroup(group: string): ContentSeedRow[] {
  return CONTENT_SEED_ROWS.filter((r) => r.group === group);
}
