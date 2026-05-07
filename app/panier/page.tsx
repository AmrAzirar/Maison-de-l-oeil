"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useCart } from "@/lib/cart-context";

export default function PanierPage() {
  const { items, updateQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
          <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
          <h1
            className="text-2xl font-bold text-[#1A1A1A] mb-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Votre panier est vide
          </h1>
          <p className="text-gray-500 mb-8">
            Découvrez notre collection et ajoutez des articles à votre panier.
          </p>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 bg-[#C9A227] hover:bg-[#b08d20] text-white font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            Voir le catalogue <ArrowRight className="h-5 w-5" />
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1
            className="text-3xl font-bold text-[#1A1A1A] mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Mon Panier
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      {item.brand}
                    </p>
                    <h3 className="font-semibold text-[#1A1A1A] truncate">
                      {item.name}
                    </h3>
                    {item.color && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        Couleur : {item.color}
                      </p>
                    )}
                    <p className="text-[#C9A227] font-bold mt-1">
                      {item.price.toLocaleString("fr-DZ")} DA
                    </p>
                  </div>

                  {/* Quantité */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-[#C9A227] transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-[#C9A227] transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Sous-total */}
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="font-bold text-[#1A1A1A]">
                      {(item.price * item.quantity).toLocaleString("fr-DZ")} DA
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 shrink-0"
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Résumé */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="font-semibold text-[#1A1A1A] text-lg mb-6">
                  Résumé de la commande
                </h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate pr-2">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium shrink-0">
                        {(item.price * item.quantity).toLocaleString("fr-DZ")} DA
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#C9A227]">
                      {total.toLocaleString("fr-DZ")} DA
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Livraison calculée à la commande
                  </p>
                </div>

                <Link
                  href="/commande"
                  className="block w-full text-center bg-[#C9A227] hover:bg-[#b08d20] text-white font-semibold py-4 rounded-xl transition-colors"
                >
                  Passer la commande
                </Link>

                <Link
                  href="/catalogue"
                  className="block w-full text-center text-gray-500 hover:text-[#C9A227] text-sm mt-4 transition-colors"
                >
                  Continuer les achats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
