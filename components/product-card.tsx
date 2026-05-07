"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/mock-data";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      <Link href={`/produit/${product.id}`}>
        <div className="relative h-52 bg-gray-50 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-[#C9A227] text-white text-xs px-2 py-1 rounded-full font-medium">
              Nouveau
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-medium">
          {product.brand}
        </p>
        <Link href={`/produit/${product.id}`}>
          <h3 className="font-semibold text-[#1A1A1A] mb-3 hover:text-[#C9A227] transition-colors leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-[#C9A227] font-bold text-lg">
            {product.price.toLocaleString("fr-DZ")} DA
          </span>
          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.images[0],
              })
            }
            className="bg-[#C9A227] hover:bg-[#b08d20] active:bg-[#9a7a1c] text-white p-2.5 rounded-lg transition-colors cursor-pointer"
            title="Ajouter au panier"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
