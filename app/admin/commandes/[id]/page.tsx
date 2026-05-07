"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Package, User, Phone, Mail, MapPin, Truck, FileText } from "lucide-react";
import { orders as mockOrders, Order } from "@/lib/mock-data";

const statusConfig = {
  "en-attente": { label: "En attente", color: "bg-amber-100 text-amber-700 border-amber-200" },
  confirmee: { label: "Confirmée", color: "bg-green-100 text-green-700 border-green-200" },
  annulee: { label: "Annulée", color: "bg-red-100 text-red-700 border-red-200" },
};

export default function CommandeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const found = mockOrders.find((o) => o.id === id);
  if (!found) notFound();

  const [order, setOrder] = useState<Order>(found);
  const s = statusConfig[order.status];

  return (
    <div>
      <Link
        href="/admin/commandes"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#C9A227] transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux commandes
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-2xl font-bold text-[#1A1A1A]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {order.orderNumber}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Créée le {new Date(order.createdAt).toLocaleString("fr-DZ")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-semibold px-4 py-2 rounded-full border ${s.color}`}>
            {s.label}
          </span>
          <select
            value={order.status}
            onChange={(e) => setOrder((p) => ({ ...p, status: e.target.value as Order["status"] }))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A227] bg-white"
          >
            <option value="en-attente">En attente</option>
            <option value="confirmee">Confirmée</option>
            <option value="annulee">Annulée</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informations client */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-[#C9A227]" />
            Informations client
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-gray-400 shrink-0" />
              <span className="text-gray-700">{order.customerName}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-gray-400 shrink-0" />
              <span className="text-gray-700">{order.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-gray-400 shrink-0" />
              <span className="text-gray-700">{order.email}</span>
            </div>
          </div>
        </div>

        {/* Livraison */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
            <Truck className="h-4 w-4 text-[#C9A227]" />
            Livraison
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <Truck className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
              <span className="text-gray-700 capitalize">
                {order.deliveryMethod === "livraison"
                  ? "Livraison à domicile"
                  : "Retrait en magasin"}
              </span>
            </div>
            {order.deliveryMethod === "livraison" && (
              <>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="text-gray-700">{order.city}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{order.address}</span>
                </div>
              </>
            )}
            {order.notes && (
              <div className="flex items-start gap-3 text-sm">
                <FileText className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-gray-700 italic">{order.notes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Produits */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
          <h2 className="font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
            <Package className="h-4 w-4 text-[#C9A227]" />
            Articles commandés
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase py-2">
                    Produit
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase py-2">
                    Prix unit.
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase py-2">
                    Qté
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase py-2">
                    Sous-total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 text-sm font-medium text-[#1A1A1A]">
                      {item.productName}
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {item.price.toLocaleString("fr-DZ")} DA
                    </td>
                    <td className="py-3 text-sm text-gray-600">{item.quantity}</td>
                    <td className="py-3 text-sm font-semibold text-right text-[#1A1A1A]">
                      {(item.price * item.quantity).toLocaleString("fr-DZ")} DA
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-100">
                  <td colSpan={3} className="py-3 text-sm font-bold text-[#1A1A1A]">
                    Total
                  </td>
                  <td className="py-3 text-lg font-bold text-right text-[#C9A227]">
                    {order.total.toLocaleString("fr-DZ")} DA
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
