"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingCart, ChevronLeft, Check } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/mock-data";
import { useCart } from "@/lib/cart-context";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);

  const similar = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#C9A227] transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour au catalogue
          </Link>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Images */}
              <div className="p-6 lg:p-10">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-[#C9A227] text-white text-xs px-3 py-1 rounded-full font-medium">
                      Nouveau
                    </span>
                  )}
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-3">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === i
                            ? "border-[#C9A227]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Image src={img} alt={`Vue ${i + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 lg:p-10 border-t lg:border-t-0 lg:border-l border-gray-100">
                <p className="text-sm text-[#C9A227] font-semibold uppercase tracking-wider mb-2">
                  {product.brand}
                </p>
                <h1
                  className="text-3xl font-bold text-[#1A1A1A] mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {product.name}
                </h1>

                <p className="text-4xl font-bold text-[#C9A227] mb-6">
                  {product.price.toLocaleString("fr-DZ")} DA
                </p>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Couleurs */}
                {product.colors.length > 1 && (
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-3">
                      Couleur :{" "}
                      <span className="text-[#C9A227]">{selectedColor}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-lg text-sm border-2 transition-colors ${
                            selectedColor === color
                              ? "border-[#C9A227] bg-[#C9A227]/10 text-[#C9A227] font-medium"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Infos */}
                <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-500 block mb-1">Catégorie</span>
                    <span className="font-medium text-[#1A1A1A] capitalize">
                      {product.category.replace("-", " ")}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-500 block mb-1">Genre</span>
                    <span className="font-medium text-[#1A1A1A] capitalize">
                      {product.gender}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-500 block mb-1">Stock</span>
                    <span
                      className={`font-medium ${
                        product.stock > 5 ? "text-green-600" : "text-orange-500"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} disponible${product.stock > 1 ? "s" : ""}`
                        : "Rupture de stock"}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-500 block mb-1">Référence</span>
                    <span className="font-medium text-[#1A1A1A]">#{product.id.padStart(4, "0")}</span>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-base transition-all ${
                    added
                      ? "bg-green-500 text-white"
                      : product.stock === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#C9A227] hover:bg-[#b08d20] text-white cursor-pointer"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="h-5 w-5" />
                      Ajouté au panier !
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Ajouter au panier
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Produits similaires */}
          {similar.length > 0 && (
            <div className="mt-16">
              <h2
                className="text-2xl font-bold text-[#1A1A1A] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Produits similaires
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similar.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
