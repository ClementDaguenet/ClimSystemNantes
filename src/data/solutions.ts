import {
  Flame,
  Snowflake,
  Wind,
  Droplets,
  Fan,
  Wrench,
} from "lucide-react";
import type { SolutionCategory } from "@/types";

export const solutions: SolutionCategory[] = [
  {
    id: "chauffage",
    slug: "chauffage",
    title: "Chauffage",
    tagline: "Pompes à chaleur, planchers chauffants et solutions d'appoint",
    description:
      "Une gamme complète de solutions de chauffage haute performance, du résidentiel au tertiaire. Pompes à chaleur sur air, eau ou piscine, plancher chauffant hydronique, ballon thermodynamique et rideaux d'air pour le commerce : nous vous accompagnons sur toutes les typologies de chantier.",
    bullets: [
      "PAC Piscine",
      "PAC Air / Eau",
      "PAC Eau / Eau",
      "Plancher chauffant",
      "Ballon thermodynamique",
      "Rideau d'air",
    ],
    icon: Flame,
    imageAlt:
      "Installation d'une pompe à chaleur extérieure dans un environnement résidentiel",
  },
  {
    id: "climatisation",
    slug: "climatisation",
    title: "Climatisation",
    tagline: "Du résidentiel au data center, en passant par le tertiaire",
    description:
      "De la climatisation murale grand public aux installations critiques pour data centers et salles de métrologie : nous distribuons l'ensemble des technologies de refroidissement, avec leurs solutions de régulation associées (commande centralisée, AIRZONE).",
    bullets: [
      "Data center & salle de métrologie",
      "DRV (débit réfrigérant variable)",
      "Eau glacée",
      "Monosplit & multisplits",
      "Climatisation monobloc : Windows & Olympia-Frico",
      "Régulation : commande centralisée, AIRZONE",
    ],
    icon: Snowflake,
    imageAlt:
      "Unité intérieure de climatisation murale dans un bureau moderne lumineux",
  },
  {
    id: "diffusion",
    slug: "diffusion",
    title: "Diffusion d'air",
    tagline: "Tôlerie sur mesure, gaines techniques et diffuseurs",
    description:
      "La diffusion d'air conditionne le confort final. Notre atelier de tôlerie réalise plénums et boîtes à bouche sur mesure, et nous distribuons les gaines microperforées (métalliques ou textiles) ainsi qu'une large sélection de diffuseurs et grilles.",
    bullets: [
      "Tôlerie sur mesure : plénums, boîtes à bouche…",
      "Gaine microperforée métallique",
      "Gaine microperforée textile",
      "Diffuseurs & grilles",
    ],
    icon: Wind,
    imageAlt:
      "Diffuseur d'air plafonnier circulaire installé au plafond d'un open-space",
  },
  {
    id: "hygrometrie",
    slug: "hygrometrie",
    title: "Contrôle de l'hygrométrie",
    tagline: "Maîtriser l'humidité dans tous les environnements",
    description:
      "Maîtriser l'humidité relative est essentiel pour les piscines, spas, sites industriels, agroalimentaires ou patrimoniaux. Notre offre couvre la déshumidification, la déshydratation et l'humidification, pour des taux d'hygrométrie parfaitement contrôlés.",
    bullets: [
      "Déshumidification : piscine, spa, process",
      "Déshydratation : stockage & process",
      "Humidification : stockage & process",
    ],
    icon: Droplets,
    imageAlt:
      "Humidificateur industriel installé dans un local technique avec tuyauterie inox",
  },
  {
    id: "ventilation",
    slug: "ventilation",
    title: "Ventilation et traitement d'air",
    tagline: "Centrales de traitement d'air, simple et double flux",
    description:
      "De la VMC résidentielle aux centrales de traitement d'air tertiaires et industrielles, nous distribuons des solutions performantes et économes. Les centrales double flux à haut rendement permettent de récupérer jusqu'à 90 % de l'énergie de l'air extrait.",
    bullets: [
      "Centrale de traitement d'air (CTA)",
      "VMC double flux",
      "VMC simple flux",
    ],
    icon: Fan,
    imageAlt:
      "Centrale de traitement d'air double flux installée en toiture d'un bâtiment tertiaire",
  },
  {
    id: "accessoires",
    slug: "accessoires",
    title: "Accessoires & pièces détachées",
    tagline: "Tout pour la pose et la maintenance",
    description:
      "Pour vous équiper sur l'ensemble de vos chantiers et interventions de maintenance, nos agences disposent en stock de plus de 8 000 références : destratificateurs, outillage frigoriste, supports, goulottes, pompes de relevage et bien plus encore.",
    bullets: [
      "Destratificateurs",
      "Outillage frigoriste",
      "Pompes de relevage",
      "Supports de groupe extérieur",
      "Goulottes",
      "Interrupteurs de proximité",
    ],
    icon: Wrench,
    imageAlt:
      "Plan de travail d'un atelier avec outillage de frigoriste et pièces détachées",
  },
];
