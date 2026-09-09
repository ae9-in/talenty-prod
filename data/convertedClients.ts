export type ClientTier = 'anchor' | 'standard';
export type ClientCity = 'Bengaluru' | 'Chennai' | 'Pune';

export interface ClientEntry {
  name: string;       // exact legal/trading name from TALENTY_CONVERTED_CLIENTS.csv
  city: ClientCity;
  tier: ClientTier;    // 'anchor' — Piramal Finance Limited only. 'standard' — everyone else.
}

export const CONVERTED_CLIENTS: ClientEntry[] = [
  // Anchor client (National Brand)
  {
    name: "Piramal Finance Limited",
    city: "Pune",
    tier: "anchor"
  },
  
  // Pune Clients (5 standard)
  {
    name: "Lonar Technologies Private Limited",
    city: "Pune",
    tier: "standard"
  },
  {
    name: "Comprehensive Cloud Technologies Pvt. Ltd",
    city: "Pune",
    tier: "standard"
  },
  {
    name: "Interior Elevation",
    city: "Pune",
    tier: "standard"
  },
  {
    name: "Ramchandra Sabhagruha",
    city: "Pune",
    tier: "standard"
  },
  {
    name: "SME Cargo",
    city: "Pune",
    tier: "standard"
  },

  // Chennai Clients (11 standard)
  {
    name: "Next space architects",
    city: "Chennai",
    tier: "standard"
  },
  {
    name: "Creative Style Homes",
    city: "Chennai",
    tier: "standard"
  },
  {
    name: "Creative Design",
    city: "Chennai",
    tier: "standard"
  },
  {
    name: "BS Createch",
    city: "Chennai",
    tier: "standard"
  },
  {
    name: "OneHub Digital Marketing & IT Services",
    city: "Chennai",
    tier: "standard"
  },
  {
    name: "P & P Marketing",
    city: "Chennai",
    tier: "standard"
  },
  {
    name: "Upshift Graphics",
    city: "Chennai",
    tier: "standard"
  },
  {
    name: "Vortex Engineering Pvt. Ltd. (Corporate)",
    city: "Chennai",
    tier: "standard"
  },
  {
    name: "Beyond Digital Marketing Agency",
    city: "Chennai",
    tier: "standard"
  },
  {
    name: "Kite Media",
    city: "Chennai",
    tier: "standard"
  },
  {
    name: "MALARCHI",
    city: "Chennai",
    tier: "standard"
  },

  // Bengaluru Clients (13 standard)
  {
    name: "Preethi Architects",
    city: "Bengaluru",
    tier: "standard"
  },
  {
    name: "Wright Inspires India, Architects-Interior Designers",
    city: "Bengaluru",
    tier: "standard"
  },
  {
    name: "Cubic Associates Private Limited",
    city: "Bengaluru",
    tier: "standard"
  },
  {
    name: "GIS Realty and Infra Pvt Ltd",
    city: "Bengaluru",
    tier: "standard"
  },
  {
    name: "Anantapadmam Builders Pvt. Ltd.",
    city: "Bengaluru",
    tier: "standard"
  },
  {
    name: "IYLA Constructions and structural consultants.",
    city: "Bengaluru",
    tier: "standard"
  },
  {
    name: "Sixth Realm - Architecture & Interior Design Firm",
    city: "Bengaluru",
    tier: "standard"
  },
  {
    name: "Mayukam Tech Services",
    city: "Bengaluru",
    tier: "standard"
  },
  {
    name: "Z Axis Design Studio",
    city: "Bengaluru",
    tier: "standard"
  },
  {
    name: "AKAR DESIGN STUDIO",
    city: "Bengaluru",
    tier: "standard"
  },
  {
    name: "iOceane Branding",
    city: "Bengaluru",
    tier: "standard"
  },
  {
    name: "PANDAeCe",
    city: "Bengaluru",
    tier: "standard"
  },
  {
    name: "Growthians Marketing - Best Digital Marketing Company In Bangalore",
    city: "Bengaluru",
    tier: "standard"
  }
];

export const CLIENT_CITY_COUNTS = {
  total: CONVERTED_CLIENTS.length,
  Bengaluru: CONVERTED_CLIENTS.filter(c => c.city === 'Bengaluru').length,
  Chennai: CONVERTED_CLIENTS.filter(c => c.city === 'Chennai').length,
  Pune: CONVERTED_CLIENTS.filter(c => c.city === 'Pune').length
};
