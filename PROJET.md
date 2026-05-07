# Optique Maison de l'Œil — Documentation du projet

## Stack technique

- **Next.js** 16.2.5 (App Router)
- **React** 19.2.4
- **TypeScript**
- **Tailwind CSS** v4
- **Lucide React** (icônes)
- **Fonts** : Inter (corps) + Playfair Display (titres) via `next/font/google`

---

## Identité visuelle

| Élément | Valeur |
|---------|--------|
| Couleur principale (or) | `#C9A227` |
| Couleur hover (or foncé) | `#b08d20` |
| Couleur texte | `#1A1A1A` |
| Fond | `#FFFFFF` |
| Fond admin/footer | `#1A1A1A` |

---

## Structure des fichiers

```
maison-de-loeil/
├── app/
│   ├── layout.tsx                    # Layout racine (fonts, CartProvider)
│   ├── page.tsx                      # Page d'accueil
│   ├── globals.css                   # Tailwind v4 + variables CSS couleurs/fonts
│   ├── catalogue/
│   │   ├── page.tsx                  # Page catalogue (Suspense wrapper)
│   │   └── catalogue-content.tsx    # Composant client (filtres, tri, pagination)
│   ├── produit/
│   │   └── [id]/
│   │       └── page.tsx              # Page produit détail (use params as Promise)
│   ├── panier/
│   │   └── page.tsx                  # Page panier
│   ├── commande/
│   │   └── page.tsx                  # Page checkout / formulaire commande
│   ├── confirmation/
│   │   └── page.tsx                  # Page confirmation commande
│   ├── contact/
│   │   └── page.tsx                  # Page contact
│   └── admin/
│       ├── layout.tsx                # Layout admin (importe AdminLayout client)
│       ├── page.tsx                  # Redirect → /admin/dashboard
│       ├── login/
│       │   └── page.tsx              # Login admin
│       ├── dashboard/
│       │   └── page.tsx              # Dashboard (stats + dernières commandes)
│       ├── commandes/
│       │   ├── page.tsx              # Liste toutes les commandes
│       │   └── [id]/
│       │       └── page.tsx          # Détail commande
│       └── produits/
│           ├── page.tsx              # Liste produits (modifier/supprimer)
│           └── nouveau/
│               └── page.tsx          # Formulaire ajout produit
│
├── components/
│   ├── navbar.tsx                    # Navbar sticky (logo image /logo.jpeg, panier badge)
│   ├── footer.tsx                    # Footer (contact, liens, réseaux)
│   ├── product-card.tsx              # Card produit (image, nom, prix, ajouter au panier)
│   └── admin-layout.tsx             # Sidebar admin (auth guard, navigation)
│
├── lib/
│   ├── mock-data.ts                  # 20 produits + 5 commandes fictives
│   └── cart-context.tsx             # CartProvider + useCart hook
│
├── public/
│   └── logo.jpeg                     # Logo de la boutique (ajouté manuellement)
│
├── next.config.ts                    # Config images (picsum.photos autorisé)
├── PROJET.md                         # Ce fichier
└── package.json
```

---

## Pages créées

### Pages client

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | `app/page.tsx` | Hero, catégories, 8 produits vedettes, "Pourquoi nous choisir" |
| `/catalogue` | `app/catalogue/page.tsx` | Filtres sidebar (catégorie, marque, genre, prix), tri, pagination 12/page |
| `/produit/[id]` | `app/produit/[id]/page.tsx` | Galerie images, sélecteur couleur, bouton panier, produits similaires |
| `/panier` | `app/panier/page.tsx` | Liste articles, modifier quantité, supprimer, total, bouton commander |
| `/commande` | `app/commande/page.tsx` | Formulaire client, choix livraison/retrait, résumé, info paiement livraison |
| `/confirmation` | `app/confirmation/page.tsx` | Message succès, récapitulatif commande, numéro commande |
| `/contact` | `app/contact/page.tsx` | Coordonnées, horaires, formulaire contact, carte placeholder |

### Pages admin (protégées)

| Route | Description |
|-------|-------------|
| `/admin/login` | Formulaire email + mdp. Identifiants : `admin@maisondeoeil.dz` / `admin123` |
| `/admin/dashboard` | Stats (total commandes, en attente, confirmées, total produits) + tableau dernières commandes |
| `/admin/commandes` | Tableau toutes commandes, filtre par statut, dropdown pour changer le statut |
| `/admin/commandes/[id]` | Détail complet d'une commande (client, livraison, articles, total) |
| `/admin/produits` | Tableau produits avec boutons modifier/supprimer + confirmation suppression |
| `/admin/produits/nouveau` | Formulaire ajout produit (nom, marque, catégorie, prix, stock, couleurs, images URL) |

---

## Composants clés

### `CartProvider` + `useCart` — `lib/cart-context.tsx`
- Panier géré avec React Context + `localStorage`
- Persiste après refresh
- Fonctions : `addItem`, `removeItem`, `updateQuantity`, `clearCart`
- Valeurs exposées : `items`, `total`, `count`

### `Navbar` — `components/navbar.tsx`
- Logo image (`/public/logo.jpeg`) avec `mixBlendMode: multiply`
- Badge panier en temps réel (count depuis `useCart`)
- Menu responsive (hamburger sur mobile)

### `AdminLayout` — `components/admin-layout.tsx`
- Sidebar avec navigation (Dashboard, Commandes, Produits)
- Auth guard : si pas de `admin_token` dans `localStorage` → redirect `/admin/login`
- Sur `/admin/login` : pas de sidebar (rendu direct des enfants)

---

## Données fictives — `lib/mock-data.ts`

### Produits (20 au total)
- **Catégories** : `lunettes-de-vue`, `solaires`, `lentilles`, `accessoires`
- **Marques** : Ray-Ban, Oakley, Gucci, Prada, Persol, Maui Jim
- **Genres** : homme, femme, enfant, unisex
- **Images** : `https://picsum.photos/seed/{id}/600/400` (placeholder)
- Structure prête pour connexion Supabase

### Commandes (5 au total)
- Statuts : `en-attente`, `confirmee`, `annulee`
- Clients fictifs avec villes algériennes

### Types TypeScript exportés
```ts
interface Product { id, name, brand, category, price, description, gender, colors, images, stock, isNew, isFeatured }
interface Order { id, orderNumber, customerName, phone, email, city, address, notes, deliveryMethod, items, total, status, createdAt }
interface OrderItem { productId, productName, price, quantity }
```

---

## Flux de commande (important)

1. Client remplit le formulaire sur `/commande`
2. À la soumission : commande sauvegardée dans `localStorage.setItem("last_order", JSON.stringify(order))` + panier vidé + redirect `/confirmation`
3. Sur `/confirmation` : lecture de `localStorage.getItem("last_order")` puis suppression immédiate
4. Les commandes admin (`/admin/commandes`) utilisent les données de `lib/mock-data.ts` — **pas encore connecté à une vraie base**

---

## Détails d'implémentation

### globals.css — Variables CSS (Tailwind v4)
```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #1A1A1A;
  --gold: #C9A227;
  --gold-dark: #b08d20;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-gold: var(--gold);
  --color-gold-dark: var(--gold-dark);
  --font-sans: var(--font-inter);
  --font-display: var(--font-playfair);
}
```

### app/layout.tsx — Setup fonts
```tsx
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
// HTML tag : className={`${inter.variable} ${playfair.variable}`}
```

- Pour utiliser Playfair Display dans un élément : `style={{ fontFamily: "var(--font-playfair)" }}`
- Pour Inter (corps) : automatique via `font-sans` Tailwind

### next.config.ts — Images externes autorisées
```ts
images: {
  remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
}
```

### Icônes Lucide React — limitation version installée
- `Instagram` et `Facebook` **n'existent pas** dans cette version de lucide-react
- Remplacés par `Globe` et `Globe2` dans le footer
- Avant d'utiliser une icône peu commune, vérifier avec : `node -e "const {NomIcone} = require('lucide-react'); console.log(!!NomIcone)"`

### localStorage — Clés utilisées
| Clé | Contenu | Utilisé par |
|-----|---------|-------------|
| `cart` | `CartItem[]` (panier) | `lib/cart-context.tsx` |
| `last_order` | Objet commande | `/commande` (write) → `/confirmation` (read + delete) |
| `admin_token` | `"mock_token_..."` | `components/admin-layout.tsx` (auth guard) |

### Fonts dans les styles inline
- Titres : `style={{ fontFamily: "var(--font-playfair)" }}`
- Ne pas utiliser `font-display` comme classe Tailwind, préférer le style inline

---

## Points techniques importants

### Next.js 16 — Changements vs Next.js 14
- `params` est une **Promise** : toujours faire `const { id } = await params` (Server) ou `use(params)` (Client)
- `searchParams` est aussi une **Promise**
- `useSearchParams()` nécessite un **Suspense boundary** → c'est pourquoi `/catalogue` est séparé en `page.tsx` (server) + `catalogue-content.tsx` (client)
- Les `PageProps` et `LayoutProps` sont des helpers globaux (pas besoin d'import)

### Tailwind CSS v4
- Configuration via CSS (pas de `tailwind.config.js`)
- Variables custom dans `globals.css` sous `@theme inline {}`
- Import : `@import "tailwindcss"` (pas `@tailwind base/components/utilities`)

### Auth admin (mock)
- Identifiants : `admin@maisondeoeil.dz` / `admin123`
- Token stocké : `localStorage.setItem("admin_token", "mock_token_...")`
- Suppression au logout : `localStorage.removeItem("admin_token")`
- À remplacer par Supabase Auth lors de la connexion à la base de données

### Warnings connus (non bloquants)
- **Turbopack root** : Next.js détecte deux `package-lock.json` (un dans `Documents/` et un dans le projet). Inoffensif.
- **Image sizes** : Les `<Image fill>` sans prop `sizes` génèrent un warning de performance. À corriger en ajoutant `sizes="..."` si besoin.

### AGENTS.md (règle projet)
Le fichier `AGENTS.md` à la racine impose : **lire les docs Next.js dans `node_modules/next/dist/docs/` avant d'écrire du code**, car la version installée peut avoir des breaking changes vs les données d'entraînement du modèle.

---

## Prochaines étapes suggérées

- [ ] Connecter à **Supabase** (base de données + auth)
- [ ] Remplacer les images picsum par de vraies photos produits
- [ ] Ajouter la page `/admin/produits/[id]/modifier` (modifier un produit existant)
- [ ] Intégrer un vrai système de paiement ou confirmer "paiement à la livraison"
- [ ] Ajouter un système de notifications email (commande reçue)
- [ ] Déployer sur **Vercel**

---

## Commandes utiles

```bash
# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm run start
```

Serveur disponible sur : **http://localhost:3000**
