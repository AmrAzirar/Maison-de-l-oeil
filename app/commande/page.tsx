"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Store, AlertCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useCart } from "@/lib/cart-context";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  notes: string;
  deliveryMethod: "livraison" | "retrait";
}

export default function CommandePage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    notes: "",
    deliveryMethod: "livraison",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Le nom est requis";
    if (!form.phone.trim()) newErrors.phone = "Le téléphone est requis";
    if (!form.email.trim()) newErrors.email = "L'email est requis";
    if (form.deliveryMethod === "livraison") {
      if (!form.city.trim()) newErrors.city = "La ville est requise";
      if (!form.address.trim()) newErrors.address = "L'adresse est requise";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const orderNumber = `CMD-${Date.now()}`;
    const order = {
      orderNumber,
      ...form,
      items: items.map((i) => ({
        productId: i.id,
        productName: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      total,
      status: "en-attente",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("last_order", JSON.stringify(order));
    clearCart();
    router.push("/confirmation");
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-gray-50 px-4">
          <AlertCircle className="h-12 w-12 text-gray-300" />
          <p className="text-gray-600">Votre panier est vide.</p>
          <Link href="/catalogue" className="text-[#C9A227] hover:underline font-medium">
            Retour au catalogue
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const inputClass = (field: keyof FormData) =>
    `w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors ${
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-gray-200 focus:border-[#C9A227]"
    }`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            href="/panier"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#C9A227] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au panier
          </Link>

          <h1
            className="text-3xl font-bold text-[#1A1A1A] mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Finaliser la commande
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulaire */}
              <div className="lg:col-span-2 space-y-6">
                {/* Coordonnées */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="font-semibold text-[#1A1A1A] text-lg mb-6">
                    Vos coordonnées
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet *
                      </label>
                      <input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Ex: Ahmed Benali"
                        className={inputClass("fullName")}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone *
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+213 555 123 456"
                        className={inputClass("phone")}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="vous@email.com"
                        className={inputClass("email")}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Livraison */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="font-semibold text-[#1A1A1A] text-lg mb-4">
                    Mode de livraison
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {[
                      { value: "livraison", label: "Livraison à domicile", icon: MapPin },
                      { value: "retrait", label: "Retrait en magasin", icon: Store },
                    ].map(({ value, label, icon: Icon }) => (
                      <label
                        key={value}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                          form.deliveryMethod === value
                            ? "border-[#C9A227] bg-[#C9A227]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value={value}
                          checked={form.deliveryMethod === value}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <Icon
                          className={`h-5 w-5 ${
                            form.deliveryMethod === value
                              ? "text-[#C9A227]"
                              : "text-gray-400"
                          }`}
                        />
                        <span
                          className={`font-medium text-sm ${
                            form.deliveryMethod === value
                              ? "text-[#C9A227]"
                              : "text-gray-600"
                          }`}
                        >
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>

                  {form.deliveryMethod === "livraison" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ville *
                        </label>
                        <input
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          placeholder="Ex: Alger"
                          className={inputClass("city")}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Adresse complète *
                        </label>
                        <input
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          placeholder="Numéro, rue, quartier..."
                          className={inputClass("address")}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {form.deliveryMethod === "retrait" && (
                    <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                      <strong className="text-[#1A1A1A]">Adresse de la boutique :</strong>
                      <br />
                      12 Rue Didouche Mourad, Alger Centre — Lun-Sam 9h-18h
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="font-semibold text-[#1A1A1A] text-lg mb-4">
                    Notes / Remarques{" "}
                    <span className="text-gray-400 font-normal text-sm">(optionnel)</span>
                  </h2>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Instructions particulières pour la livraison, questions..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A227] transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Résumé */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h2 className="font-semibold text-[#1A1A1A] text-lg mb-4">
                    Résumé
                  </h2>

                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#1A1A1A] truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400">× {item.quantity}</p>
                        </div>
                        <span className="text-xs font-semibold text-[#1A1A1A] shrink-0">
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
                  </div>

                  {/* Info paiement */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
                    <p className="text-xs text-amber-800 leading-relaxed">
                      <strong>Paiement à la livraison</strong> — Notre équipe vous
                      contactera pour confirmer votre commande sous 24h.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#C9A227] hover:bg-[#b08d20] disabled:bg-[#C9A227]/60 text-white font-semibold py-4 rounded-xl transition-colors"
                  >
                    {loading ? "Traitement..." : "Confirmer la commande"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
