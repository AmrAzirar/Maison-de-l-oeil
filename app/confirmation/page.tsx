"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Home, Package } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface LastOrder {
  orderNumber: string;
  fullName: string;
  total: number;
  items: Array<{ productName: string; quantity: number; price: number }>;
  deliveryMethod: "livraison" | "retrait";
}

export default function ConfirmationPage() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("last_order");
    if (stored) {
      try {
        setOrder(JSON.parse(stored));
        localStorage.removeItem("last_order");
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
        <div className="max-w-lg w-full">
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>

            <h1
              className="text-2xl font-bold text-[#1A1A1A] mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Commande confirmée !
            </h1>

            {order && (
              <p className="text-gray-500 mb-2">
                Numéro de commande :{" "}
                <span className="font-semibold text-[#C9A227]">{order.orderNumber}</span>
              </p>
            )}

            <p className="text-gray-500 text-sm mb-8">
              Vous recevrez un email de confirmation.
              <br />
              Notre équipe vous contactera sous{" "}
              <span className="font-medium text-[#1A1A1A]">24h</span> pour valider votre
              commande.
            </p>

            {/* Infos */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-8">
              <strong>Paiement à la livraison</strong> — Préparez le montant exact lors
              de la réception de votre colis.
            </div>

            {/* Résumé */}
            {order && (
              <div className="border border-gray-100 rounded-xl p-4 text-left mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="h-4 w-4 text-[#C9A227]" />
                  <h3 className="font-semibold text-[#1A1A1A] text-sm">
                    Récapitulatif
                  </h3>
                </div>
                <div className="space-y-2 mb-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.productName} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        {(item.price * item.quantity).toLocaleString("fr-DZ")} DA
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-[#C9A227]">
                    {order.total.toLocaleString("fr-DZ")} DA
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2 capitalize">
                  Mode : {order.deliveryMethod === "livraison" ? "Livraison à domicile" : "Retrait en magasin"}
                </p>
              </div>
            )}

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#C9A227] hover:bg-[#b08d20] text-white font-semibold px-8 py-4 rounded-xl transition-colors w-full justify-center"
            >
              <Home className="h-5 w-5" />
              Retour à l&apos;accueil
            </Link>
          </div>

          <p className="text-center text-sm text-gray-400">
            Des questions ?{" "}
            <Link href="/contact" className="text-[#C9A227] hover:underline">
              Contactez-nous
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
