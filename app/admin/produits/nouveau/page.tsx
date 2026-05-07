"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, X } from "lucide-react";

interface ProductForm {
  name: string;
  brand: string;
  category: string;
  price: string;
  description: string;
  gender: string;
  stock: string;
  isNew: boolean;
  isFeatured: boolean;
  images: string[];
  colors: string[];
}

const BRANDS = ["Ray-Ban", "Oakley", "Gucci", "Prada", "Persol", "Maui Jim"];
const CATEGORIES = [
  { value: "lunettes-de-vue", label: "Lunettes de Vue" },
  { value: "solaires", label: "Lunettes de Soleil" },
  { value: "lentilles", label: "Lentilles" },
  { value: "accessoires", label: "Accessoires" },
];
const GENDERS = [
  { value: "homme", label: "Homme" },
  { value: "femme", label: "Femme" },
  { value: "enfant", label: "Enfant" },
  { value: "unisex", label: "Unisexe" },
];

export default function NouveauProduitPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [newColor, setNewColor] = useState("");
  const [form, setForm] = useState<ProductForm>({
    name: "",
    brand: BRANDS[0],
    category: "lunettes-de-vue",
    price: "",
    description: "",
    gender: "unisex",
    stock: "",
    isNew: false,
    isFeatured: false,
    images: [],
    colors: [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addImage = () => {
    if (newImage.trim()) {
      setForm((prev) => ({ ...prev, images: [...prev.images, newImage.trim()] }));
      setNewImage("");
    }
  };

  const removeImage = (i: number) =>
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }));

  const addColor = () => {
    if (newColor.trim()) {
      setForm((prev) => ({ ...prev, colors: [...prev.colors, newColor.trim()] }));
      setNewColor("");
    }
  };

  const removeColor = (i: number) =>
    setForm((prev) => ({ ...prev, colors: prev.colors.filter((_, idx) => idx !== i) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    // Ici on connectera à Supabase
    setSaving(false);
    router.push("/admin/produits");
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A227] transition-colors";

  return (
    <div>
      <Link
        href="/admin/produits"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#C9A227] transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux produits
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-2xl font-bold text-[#1A1A1A]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Ajouter un produit
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-semibold text-[#1A1A1A] mb-5">
                Informations générales
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du produit *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Wayfarer Classic"
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marque *
                    </label>
                    <select
                      name="brand"
                      value={form.brand}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {BRANDS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Catégorie *
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    placeholder="Description complète du produit..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prix (DA) *
                    </label>
                    <input
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleChange}
                      required
                      min="0"
                      placeholder="18900"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock *
                    </label>
                    <input
                      name="stock"
                      type="number"
                      value={form.stock}
                      onChange={handleChange}
                      required
                      min="0"
                      placeholder="10"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Genre *
                    </label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {GENDERS.map((g) => (
                        <option key={g.value} value={g.value}>{g.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-semibold text-[#1A1A1A] mb-4">
                Images (URLs)
              </h2>
              <div className="flex gap-2 mb-3">
                <input
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={inputClass}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="bg-[#C9A227] hover:bg-[#b08d20] text-white px-4 py-2 rounded-lg transition-colors shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {form.images.length > 0 && (
                <div className="space-y-2">
                  {form.images.map((img, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                    >
                      <span className="text-sm text-gray-600 flex-1 truncate">{img}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Couleurs */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-semibold text-[#1A1A1A] mb-4">Couleurs</h2>
              <div className="flex gap-2 mb-3">
                <input
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="Ex: Noir, Havane..."
                  className={inputClass}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addColor())}
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="bg-[#C9A227] hover:bg-[#b08d20] text-white px-4 py-2 rounded-lg transition-colors shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {form.colors.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.colors.map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {c}
                      <button
                        type="button"
                        onClick={() => removeColor(i)}
                        className="text-gray-400 hover:text-red-500 ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar options */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-semibold text-[#1A1A1A] mb-4">Options</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={form.isNew}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#C9A227]"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">Nouveau produit</p>
                    <p className="text-xs text-gray-400">Affiche le badge &quot;Nouveau&quot;</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={form.isFeatured}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#C9A227]"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">Produit vedette</p>
                    <p className="text-xs text-gray-400">Affiché sur la page d&apos;accueil</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#b08d20] disabled:bg-[#C9A227]/60 text-white font-semibold py-4 rounded-xl transition-colors"
            >
              <Save className="h-4 w-4" />
              {saving ? "Enregistrement..." : "Sauvegarder le produit"}
            </button>

            <Link
              href="/admin/produits"
              className="block w-full text-center border border-gray-200 hover:border-gray-300 text-gray-600 font-medium py-3.5 rounded-xl transition-colors text-sm"
            >
              Annuler
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
