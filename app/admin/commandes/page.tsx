"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { orders as mockOrders, Order } from "@/lib/mock-data";

const statusConfig = {
  "en-attente": { label: "En attente", color: "bg-amber-100 text-amber-700" },
  confirmee: { label: "Confirmée", color: "bg-green-100 text-green-700" },
  annulee: { label: "Annulée", color: "bg-red-100 text-red-700" },
};

export default function CommandesPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const updateStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-[#1A1A1A]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Gestion des commandes
        </h1>
        <p className="text-gray-500 mt-1 text-sm">{orders.length} commandes au total</p>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { value: "all", label: "Toutes" },
          { value: "en-attente", label: "En attente" },
          { value: "confirmee", label: "Confirmées" },
          { value: "annulee", label: "Annulées" },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === value
                ? "bg-[#C9A227] text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-[#C9A227]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Numéro", "Client", "Téléphone", "Total", "Statut", "Date", "Actions"].map(
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
              {filtered.map((order) => {
                const s = statusConfig[order.status];
                return (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-[#1A1A1A]">
                        {order.orderNumber}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700">
                      {order.customerName}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {order.phone}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-[#1A1A1A]">
                      {order.total.toLocaleString("fr-DZ")} DA
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${s.color}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("fr-DZ")}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/commandes/${order.id}`}
                          className="p-1.5 text-gray-400 hover:text-[#C9A227] transition-colors"
                          title="Voir le détail"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order.id, e.target.value as Order["status"])
                          }
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#C9A227] bg-white"
                        >
                          <option value="en-attente">En attente</option>
                          <option value="confirmee">Confirmée</option>
                          <option value="annulee">Annulée</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">
                    Aucune commande trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
