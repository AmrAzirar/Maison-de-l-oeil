"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const horaires = [
  { jour: "Lundi – Vendredi", heure: "09h00 – 18h00" },
  { jour: "Samedi", heure: "09h00 – 17h00" },
  { jour: "Dimanche", heure: "Fermé" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl font-bold text-[#1A1A1A] mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Contactez-nous
            </h1>
            <p className="text-gray-500 max-w-md mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos
              questions.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Infos */}
            <div className="space-y-8">
              {/* Coordonnées */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-semibold text-[#1A1A1A] text-lg mb-5">
                  Nos coordonnées
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-[#C9A227]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1A1A] text-sm">Adresse</p>
                      <p className="text-gray-500 text-sm">
                        12 Rue Didouche Mourad, Alger Centre, Algérie
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-[#C9A227]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1A1A] text-sm">Téléphone</p>
                      <p className="text-gray-500 text-sm">+213 21 23 45 67</p>
                      <p className="text-gray-500 text-sm">+213 555 789 012</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-[#C9A227]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1A1A] text-sm">Email</p>
                      <p className="text-gray-500 text-sm">contact@maisondeoeil.dz</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Clock className="h-5 w-5 text-[#C9A227]" />
                  <h2 className="font-semibold text-[#1A1A1A] text-lg">
                    Horaires d&apos;ouverture
                  </h2>
                </div>
                <div className="space-y-3">
                  {horaires.map(({ jour, heure }) => (
                    <div
                      key={jour}
                      className="flex justify-between text-sm border-b border-gray-50 last:border-0 pb-2 last:pb-0"
                    >
                      <span className="text-gray-600">{jour}</span>
                      <span
                        className={`font-medium ${
                          heure === "Fermé" ? "text-red-400" : "text-[#1A1A1A]"
                        }`}
                      >
                        {heure}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carte placeholder */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden h-52">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-400 gap-2">
                  <MapPin className="h-8 w-8" />
                  <p className="text-sm">Google Maps</p>
                  <p className="text-xs">12 Rue Didouche Mourad, Alger</p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
              <h2 className="font-semibold text-[#1A1A1A] text-lg mb-6">
                Envoyer un message
              </h2>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                  <h3 className="font-semibold text-[#1A1A1A] text-lg">
                    Message envoyé !
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Nous vous répondrons dans les meilleurs délais.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-[#C9A227] hover:underline text-sm mt-2"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
                    />
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
                      required
                      placeholder="vous@email.com"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Votre message..."
                      rows={6}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A227] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#b08d20] disabled:bg-[#C9A227]/60 text-white font-semibold py-4 rounded-xl transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    {loading ? "Envoi..." : "Envoyer le message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
