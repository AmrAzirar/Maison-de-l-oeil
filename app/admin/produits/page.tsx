"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { products as mockProducts, Product } from "@/lib/mock-data";

const categoryLabels: Record<string, string> = {
  "lunettes-de-vue": "Lunettes de Vue",
  solaires: "Solaires",
  lentilles: "Lentilles",
  accessoires: "Accessoires",
};

export default function AdminProduitsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [toDelete, setToDelete] = useState<string | null>(null);

  const confirmDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setToDelete(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold text-[#1A1A1A]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Gestion des produits
          </h1>
          <p className="text-gray-500 mt-1 text-sm">{products.length} produits</p>
        </div>
        <Link
          href="/admin/produits/nouveau"
          className="inline-flex items-center gap-2 bg-[#C9A227] hover:bg-[#b08d20] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus className="h-4 w-4" />
          Ajouter un produit
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Image", "Nom", "Marque", "Catégorie", "Prix", "Stock", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-sm font-medium text-[#1A1A1A] max-w-[180px] truncate">
                      {product.name}
                    </p>
                    {product.isNew && (
                      <span className="text-xs text-[#C9A227] font-medium">Nouveau</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">{product.brand}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {categoryLabels[product.category] || product.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm font-semibold text-[#C9A227]">
                    {product.price.toLocaleString("fr-DZ")} DA
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-sm font-medium ${
                        product.stock > 5
                          ? "text-green-600"
                          : product.stock > 0
                          ? "text-orange-500"
                          : "text-red-500"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/produits/${product.id}/modifier`}
                        className="p-1.5 text-gray-400 hover:text-[#C9A227] transition-colors"
                        title="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setToDelete(product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm delete modal */}
      {toDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="font-bold text-[#1A1A1A] text-lg mb-2">
              Supprimer ce produit ?
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setToDelete(null)}
                className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => confirmDelete(toDelete)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
