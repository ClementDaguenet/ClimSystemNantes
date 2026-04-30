import {
  PackageOpen,
  Microscope,
  ClipboardCheck,
  Timer,
  Settings,
} from "lucide-react";
import type { Atout } from "@/types";

export const atouts: Atout[] = [
  {
    id: "pieces-multimarques",
    title: "Pièces détachées multimarques",
    description:
      "Un service de fourniture de pièces toutes marques pour vos chantiers et vos interventions de maintenance.",
    icon: PackageOpen,
  },
  {
    id: "equipe-technique",
    title: "Équipe technique avant-vente",
    description:
      "Nos experts vous accompagnent dans le dimensionnement et le chiffrage de vos projets, du résidentiel à l'industriel.",
    icon: Microscope,
  },
  {
    id: "visites-chantier",
    title: "Visites & conseils chantier",
    description:
      "Visites techniques et conseils pendant la réalisation de l'installation, pour sécuriser vos chantiers complexes.",
    icon: ClipboardCheck,
  },
  {
    id: "devis-24-48h",
    title: "Devis sous 24/48h",
    description:
      "Engagement de réactivité : retour de votre devis sous 24 à 48 heures pour vous permettre de tenir vos délais.",
    icon: Timer,
  },
  {
    id: "mise-en-service",
    title: "Mise en service",
    description:
      "Mise en service des équipements via notre réseau de partenaires qualifiés, partout en France.",
    icon: Settings,
  },
];
