export interface Product {
  id: string;
  name: string;
  brand: string;
  category: "lunettes-de-vue" | "solaires" | "lentilles" | "accessoires";
  price: number;
  description: string;
  gender: "homme" | "femme" | "enfant" | "unisex";
  colors: string[];
  images: string[];
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  notes?: string;
  deliveryMethod: "livraison" | "retrait";
  items: OrderItem[];
  total: number;
  status: "en-attente" | "confirmee" | "annulee";
  createdAt: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wayfarer Classic",
    brand: "Ray-Ban",
    category: "solaires",
    price: 18900,
    description:
      "Le modèle iconique Ray-Ban Wayfarer en acétate noir avec verres polarisés UV400. Une lunette intemporelle au style indémodable.",
    gender: "unisex",
    colors: ["Noir", "Écaille"],
    images: [
      "https://picsum.photos/seed/rayban1/600/400",
      "https://picsum.photos/seed/rayban1b/600/400",
    ],
    stock: 15,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Aviator Large Metal",
    brand: "Ray-Ban",
    category: "solaires",
    price: 17500,
    description:
      "L'aviateur légendaire en métal doré avec verres en verre cristal. Élégance et style à l'américaine.",
    gender: "unisex",
    colors: ["Or", "Argent"],
    images: [
      "https://picsum.photos/seed/rayban2/600/400",
      "https://picsum.photos/seed/rayban2b/600/400",
    ],
    stock: 8,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Holbrook",
    brand: "Oakley",
    category: "solaires",
    price: 16800,
    description:
      "Monture sport premium en acétate avec verres Prizm pour une clarté et un contraste optimaux.",
    gender: "homme",
    colors: ["Noir mat", "Écaille"],
    images: [
      "https://picsum.photos/seed/oakley1/600/400",
      "https://picsum.photos/seed/oakley1b/600/400",
    ],
    stock: 12,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "4",
    name: "GG0396S",
    brand: "Gucci",
    category: "solaires",
    price: 42000,
    description:
      "Lunettes de soleil femme Gucci en acétate avec détails métal dorés. Le luxe à l'état pur.",
    gender: "femme",
    colors: ["Noir/Or", "Havane/Or"],
    images: [
      "https://picsum.photos/seed/gucci1/600/400",
      "https://picsum.photos/seed/gucci1b/600/400",
    ],
    stock: 5,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "5",
    name: "PR 17WS",
    brand: "Prada",
    category: "solaires",
    price: 38500,
    description:
      "Lunettes de soleil Prada à monture cat-eye en acétate avec verres dégradés. Raffinement et modernité.",
    gender: "femme",
    colors: ["Noir", "Blanc"],
    images: [
      "https://picsum.photos/seed/prada1/600/400",
      "https://picsum.photos/seed/prada1b/600/400",
    ],
    stock: 7,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "6",
    name: "714 Steve McQueen",
    brand: "Persol",
    category: "solaires",
    price: 28000,
    description:
      "L'édition légendaire Steve McQueen en acétate havane avec verres polarisés. Une icône du cinéma.",
    gender: "homme",
    colors: ["Havane"],
    images: [
      "https://picsum.photos/seed/persol1/600/400",
      "https://picsum.photos/seed/persol1b/600/400",
    ],
    stock: 6,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "7",
    name: "Peahi",
    brand: "Maui Jim",
    category: "solaires",
    price: 32000,
    description:
      "Lunettes de soleil sportives avec les verres PolarizedPlus2 exclusifs de Maui Jim pour une vision cristalline.",
    gender: "unisex",
    colors: ["Noir", "Gris"],
    images: [
      "https://picsum.photos/seed/maui1/600/400",
      "https://picsum.photos/seed/maui1b/600/400",
    ],
    stock: 9,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "8",
    name: "RX5228 Classic",
    brand: "Ray-Ban",
    category: "lunettes-de-vue",
    price: 14500,
    description:
      "Monture de vue Ray-Ban en acétate avec la forme iconique Wayfarer. Compatible avec tous types de verres correcteurs.",
    gender: "unisex",
    colors: ["Noir", "Écaille", "Bleu"],
    images: [
      "https://picsum.photos/seed/rb-vue1/600/400",
      "https://picsum.photos/seed/rb-vue1b/600/400",
    ],
    stock: 20,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "9",
    name: "OX8103 Crosslink",
    brand: "Oakley",
    category: "lunettes-de-vue",
    price: 19500,
    description:
      "Monture de vue sport Oakley avec technologie Three-Point Fit pour un confort maximal toute la journée.",
    gender: "homme",
    colors: ["Noir", "Gris ardoise"],
    images: [
      "https://picsum.photos/seed/oakley-vue1/600/400",
      "https://picsum.photos/seed/oakley-vue1b/600/400",
    ],
    stock: 11,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "10",
    name: "GG0439O",
    brand: "Gucci",
    category: "lunettes-de-vue",
    price: 39000,
    description:
      "Monture de vue Gucci en métal doré avec détails logo sur les branches. Le prestige au quotidien.",
    gender: "femme",
    colors: ["Or", "Or rose"],
    images: [
      "https://picsum.photos/seed/gucci-vue1/600/400",
      "https://picsum.photos/seed/gucci-vue1b/600/400",
    ],
    stock: 4,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "11",
    name: "PR 50ZV",
    brand: "Prada",
    category: "lunettes-de-vue",
    price: 35000,
    description:
      "Monture de vue Prada rectangulaire en métal avec logo triangle iconique. Sophistication contemporaine.",
    gender: "unisex",
    colors: ["Argent", "Or"],
    images: [
      "https://picsum.photos/seed/prada-vue1/600/400",
      "https://picsum.photos/seed/prada-vue1b/600/400",
    ],
    stock: 6,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "12",
    name: "Lentilles Journalières",
    brand: "Maui Jim",
    category: "lentilles",
    price: 4500,
    description:
      "Pack de 30 lentilles de contact journalières haute performance avec technologie d'hydratation avancée.",
    gender: "unisex",
    colors: ["Transparent"],
    images: [
      "https://picsum.photos/seed/lens1/600/400",
      "https://picsum.photos/seed/lens1b/600/400",
    ],
    stock: 50,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "13",
    name: "Lentilles Mensuelles",
    brand: "Maui Jim",
    category: "lentilles",
    price: 3200,
    description:
      "Pack de 6 lentilles mensuelles avec traitement anti-UV intégré. Confort longue durée garanti.",
    gender: "unisex",
    colors: ["Transparent"],
    images: [
      "https://picsum.photos/seed/lens2/600/400",
      "https://picsum.photos/seed/lens2b/600/400",
    ],
    stock: 35,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "14",
    name: "Lentilles Colorées",
    brand: "Persol",
    category: "lentilles",
    price: 5800,
    description:
      "Lentilles de contact colorées mensuelles pour changer de regard. Disponibles en plusieurs teintes naturelles.",
    gender: "femme",
    colors: ["Vert", "Marron", "Bleu"],
    images: [
      "https://picsum.photos/seed/lens3/600/400",
      "https://picsum.photos/seed/lens3b/600/400",
    ],
    stock: 25,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "15",
    name: "Étui Cuir Premium",
    brand: "Ray-Ban",
    category: "accessoires",
    price: 2800,
    description:
      "Étui à lunettes en cuir véritable avec fermeture magnétique. Protège vos lunettes avec élégance.",
    gender: "unisex",
    colors: ["Noir", "Marron"],
    images: [
      "https://picsum.photos/seed/acc1/600/400",
      "https://picsum.photos/seed/acc1b/600/400",
    ],
    stock: 30,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "16",
    name: "Chiffon Microfibre",
    brand: "Oakley",
    category: "accessoires",
    price: 450,
    description:
      "Chiffon de nettoyage en microfibre haute qualité pour un entretien parfait de vos verres.",
    gender: "unisex",
    colors: ["Gris", "Bleu"],
    images: [
      "https://picsum.photos/seed/acc2/600/400",
      "https://picsum.photos/seed/acc2b/600/400",
    ],
    stock: 100,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "17",
    name: "Spray Nettoyant",
    brand: "Persol",
    category: "accessoires",
    price: 850,
    description:
      "Spray nettoyant anti-buée pour lunettes. Formule douce respectueuse des traitements de verres.",
    gender: "unisex",
    colors: ["Transparent"],
    images: [
      "https://picsum.photos/seed/acc3/600/400",
      "https://picsum.photos/seed/acc3b/600/400",
    ],
    stock: 60,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "18",
    name: "Polo Enfant Navigator",
    brand: "Ray-Ban",
    category: "lunettes-de-vue",
    price: 9500,
    description:
      "Monture de vue robuste pour enfants avec branches flexibles et matériaux ultra-résistants.",
    gender: "enfant",
    colors: ["Rouge", "Bleu", "Vert"],
    images: [
      "https://picsum.photos/seed/enfant1/600/400",
      "https://picsum.photos/seed/enfant1b/600/400",
    ],
    stock: 18,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "19",
    name: "Junior Sport",
    brand: "Oakley",
    category: "solaires",
    price: 11500,
    description:
      "Lunettes de soleil sport pour enfants avec protection UV400 et monture incassable. Parfaites pour les activités extérieures.",
    gender: "enfant",
    colors: ["Noir", "Bleu", "Rose"],
    images: [
      "https://picsum.photos/seed/enfant2/600/400",
      "https://picsum.photos/seed/enfant2b/600/400",
    ],
    stock: 14,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "20",
    name: "Trousse Kit Entretien",
    brand: "Maui Jim",
    category: "accessoires",
    price: 1950,
    description:
      "Kit complet d'entretien : étui semi-rigide, chiffon microfibre et spray nettoyant anti-buée.",
    gender: "unisex",
    colors: ["Noir"],
    images: [
      "https://picsum.photos/seed/acc4/600/400",
      "https://picsum.photos/seed/acc4b/600/400",
    ],
    stock: 40,
    isNew: true,
    isFeatured: false,
  },
];

export const orders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "CMD-2025-001",
    customerName: "Karim Benali",
    phone: "+213 555 123 456",
    email: "karim.benali@email.com",
    city: "Alger",
    address: "12 Rue Didouche Mourad, Alger Centre",
    notes: "Sonner deux fois",
    deliveryMethod: "livraison",
    items: [
      { productId: "1", productName: "Wayfarer Classic", price: 18900, quantity: 1 },
      { productId: "15", productName: "Étui Cuir Premium", price: 2800, quantity: 1 },
    ],
    total: 21700,
    status: "confirmee",
    createdAt: "2025-05-01T10:30:00Z",
  },
  {
    id: "ord-002",
    orderNumber: "CMD-2025-002",
    customerName: "Yasmine Hamdi",
    phone: "+213 555 234 567",
    email: "yasmine.hamdi@email.com",
    city: "Oran",
    address: "5 Boulevard Millénium, Oran",
    deliveryMethod: "livraison",
    items: [
      { productId: "4", productName: "GG0396S", price: 42000, quantity: 1 },
    ],
    total: 42000,
    status: "en-attente",
    createdAt: "2025-05-03T14:15:00Z",
  },
  {
    id: "ord-003",
    orderNumber: "CMD-2025-003",
    customerName: "Mohamed Larbi",
    phone: "+213 555 345 678",
    email: "m.larbi@email.com",
    city: "Constantine",
    address: "8 Rue Larbi Ben M'hidi, Constantine",
    deliveryMethod: "retrait",
    items: [
      { productId: "8", productName: "RX5228 Classic", price: 14500, quantity: 1 },
      { productId: "12", productName: "Lentilles Journalières", price: 4500, quantity: 2 },
    ],
    total: 23500,
    status: "en-attente",
    createdAt: "2025-05-04T09:00:00Z",
  },
  {
    id: "ord-004",
    orderNumber: "CMD-2025-004",
    customerName: "Sara Meziane",
    phone: "+213 555 456 789",
    email: "sara.meziane@email.com",
    city: "Annaba",
    address: "3 Rue de la République, Annaba",
    notes: "Contacter avant la livraison",
    deliveryMethod: "livraison",
    items: [
      { productId: "5", productName: "PR 17WS", price: 38500, quantity: 1 },
      { productId: "16", productName: "Chiffon Microfibre", price: 450, quantity: 2 },
    ],
    total: 39400,
    status: "annulee",
    createdAt: "2025-05-02T16:45:00Z",
  },
  {
    id: "ord-005",
    orderNumber: "CMD-2025-005",
    customerName: "Amine Khelifi",
    phone: "+213 555 567 890",
    email: "amine.khelifi@email.com",
    city: "Tizi Ouzou",
    address: "17 Avenue Mouloud Mammeri, Tizi Ouzou",
    deliveryMethod: "livraison",
    items: [
      { productId: "3", productName: "Holbrook", price: 16800, quantity: 1 },
      { productId: "20", productName: "Trousse Kit Entretien", price: 1950, quantity: 1 },
    ],
    total: 18750,
    status: "confirmee",
    createdAt: "2025-05-05T11:20:00Z",
  },
];
