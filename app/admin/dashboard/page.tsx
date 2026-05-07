"use client";

import Link from "next/link";
import { ShoppingBag, Clock, CheckCircle, Package, ArrowRight } from "lucide-react";
import { orders, products } from "@/lib/mock-data";

const statusConfig = {
  "en-attente": { label: "En attente", color: "bg-amber-100 text-amber-700" },
  confirmee: { label: "Confirmée", color: "bg-green-100 text-green-700" },
  annulee: { label: "Annulée", color: "bg-red-100 text-red-700" },
};

export default function DashboardPage() {
  const stats = [
    {
      label: "Total commandes",
      value: orders.length,
      icon: ShoppingBag,
      color: "text-[#C9A227]",
      bg: "bg-[#C9A227]/10",
    },
    {
      label: "En attente",
      value: orders.filter((o) => o.status === "en-attente").length,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: "Confirmées",
      value: orders.filter((o) => o.status === "confirmee").length,
      icon: CheckCircle,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      label: "Total produits",
      value: products.length,
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
  ];

  const recent = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-[#1A1A1A]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1 text-sm">Vue d&apos;ensemble de votre boutique</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1A1A1A] mb-1">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Dernières commandes */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-gray-50">
          <h2 className="font-semibold text-[#1A1A1A]">Dernières commandes</h2>
          <Link
            href="/admin/commandes"
            className="inline-flex items-center gap-1 text-sm text-[#C9A227] hover:text-[#b08d20] font-medium transition-colors"
          >
            Voir tout <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                  Numéro
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                  Client
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                  Téléphone
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                  Total
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                  Statut
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recent.map((order) => {
                const s = statusConfig[order.status];
                return (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/commandes/${order.id}`}
                        className="text-sm font-medium text-[#C9A227] hover:underline"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.phone}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#1A1A1A]">
                      {order.total.toLocaleString("fr-DZ")} DA
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${s.color}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("fr-DZ")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
