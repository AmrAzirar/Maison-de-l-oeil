import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Truck, HeadphonesIcon, Star } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/mock-data";

const categories = [
  {
    label: "Lunettes de Vue",
    slug: "lunettes-de-vue",
    image: "https://picsum.photos/seed/cat-vue/400/300",
    count: products.filter((p) => p.category === "lunettes-de-vue").length,
  },
  {
    label: "Lunettes de Soleil",
    slug: "solaires",
    image: "https://picsum.photos/seed/cat-sol/400/300",
    count: products.filter((p) => p.category === "solaires").length,
  },
  {
    label: "Lentilles",
    slug: "lentilles",
    image: "https://picsum.photos/seed/cat-len/400/300",
    count: products.filter((p) => p.category === "lentilles").length,
  },
  {
    label: "Accessoires",
    slug: "accessoires",
    image: "https://picsum.photos/seed/cat-acc/400/300",
    count: products.filter((p) => p.category === "accessoires").length,
  },
];

const whyUs = [
  {
    icon: Shield,
    title: "Qualité Garantie",
    desc: "Toutes nos montures sont authentiques, issues des plus grandes maisons.",
  },
  {
    icon: Truck,
    title: "Livraison Rapide",
    desc: "Livraison à domicile dans toute l'Algérie sous 24 à 72h.",
  },
  {
    icon: HeadphonesIcon,
    title: "Service Expert",
    desc: "Notre équipe d'opticiens est disponible pour vous conseiller.",
  },
  {
    icon: Star,
    title: "Marques Premium",
    desc: "Ray-Ban, Gucci, Prada, Oakley — les meilleures marques mondiales.",
  },
];

const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#1A1A1A] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://picsum.photos/seed/hero-optique/1600/700"
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
          <p
            className="text-[#C9A227] text-sm uppercase tracking-[0.2em] mb-4 font-medium"
          >
            Optique Haut de Gamme
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-2xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Voyez le monde avec{" "}
            <span className="text-[#C9A227]">élégance</span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-xl leading-relaxed">
            Découvrez notre collection exclusive de lunettes de vue, solaires et
            lentilles des plus grandes marques mondiales.
          </p>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 bg-[#C9A227] hover:bg-[#b08d20] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base"
          >
            Découvrir notre collection
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-[#1A1A1A] mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Nos Catégories
            </h2>
            <p className="text-gray-500">
              Trouvez ce qui correspond à vos besoins
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalogue?categorie=${cat.slug}`}
                className="group relative rounded-xl overflow-hidden h-44 bg-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">{cat.label}</p>
                  <p className="text-xs text-gray-300">{cat.count} produits</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produits vedettes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2
                className="text-3xl font-bold text-[#1A1A1A] mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Produits Vedettes
              </h2>
              <p className="text-gray-500">Notre sélection coup de cœur</p>
            </div>
            <Link
              href="/catalogue"
              className="hidden md:inline-flex items-center gap-1 text-[#C9A227] hover:text-[#b08d20] font-medium text-sm transition-colors"
            >
              Voir tout <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 text-[#C9A227] font-medium"
            >
              Voir tous les produits <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="py-16 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Pourquoi nous choisir ?
            </h2>
            <p className="text-gray-400">
              L&apos;excellence au service de votre vision
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#C9A227]/20 mb-4">
                  <Icon className="h-7 w-7 text-[#C9A227]" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
