import type { Agency } from "@/types";

export const agencyNantes: Agency = {
  id: "nantes",
  name: "Climsystem Distribution Atlantique",
  city: "Les Sorinières",
  address: "1 Rue des Prairies",
  postalCode: "44840",
  phone: "02 59 16 58 37",
  email: "contact44@climsystem.com",
  hours: "Lun-Ven : 8h-12h / 14h-18h",
  coords: [47.148, -1.743],
  isFeatured: true,
  tagline: "Agence Ouest",
};

export const agencyChatillon: Agency = {
  id: "chatillon",
  name: "Climsystem",
  city: "Châtillon",
  address: "5 Rue Courtois",
  postalCode: "92320",
  phone: "01 47 35 10 43",
  email: "contact@climsystem.com",
  hours: "Lun-Ven : 8h-12h / 14h-18h",
  coords: [48.8138, 2.2865],
};

export const allAgenciesFixture: Agency[] = [
  agencyNantes,
  agencyChatillon,
  {
    id: "tours",
    name: "Climsystem Distribution Centre",
    city: "Chambray-lès-Tours",
    address: "3 Rue Thérèse Planiol",
    postalCode: "37170",
    phone: "02 47 36 22 67",
    email: "contact37@climsystem.com",
    hours: "Lun-Ven : 8h-12h / 14h-18h",
    coords: [47.337, 0.704],
  },
  {
    id: "aubagne",
    name: "Climsystem Distribution Provence",
    city: "Aubagne",
    address: "6 Avenue des Caniers",
    postalCode: "13400",
    phone: "04 48 82 29 10",
    email: "contact13@climsystem.com",
    hours: "Lun-Ven : 8h-12h / 14h-18h",
    coords: [43.2935, 5.5665],
  },
];
