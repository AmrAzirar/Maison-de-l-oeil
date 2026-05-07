"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/mock-data";

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
const PER_PAGE = 12;

type SortKey = "default" | "price-asc" | "price-desc" | "new";

export default function CatalogueContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categorie") || ""
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState<SortKey>("default");
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("categorie");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );

  const toggleGender = (g: string) =>
    setSelectedGenders((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategory) list = list.filter((p) => p.category === selectedCategory);
    if (selectedBrands.length) list = list.filter((p) => selectedBrands.includes(p.brand));
    if (selectedGenders.length) list = list.filter((p) => selectedGenders.includes(p.gender));
    if (priceMin) list = list.filter((p) => p.price >= Number(priceMin));
    if (priceMax) list = list.filter((p) => p.price <= Number(priceMax));

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "new")
      list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew));

    return list;
  }, [selectedCategory, selectedBrands, selectedGenders, priceMin, priceMax, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedBrands([]);
    setSelectedGenders([]);
    setPriceMin("");
    setPriceMax("");
    setSort("default");
    setPage(1);
  };

  const Filters = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-[#1A1A1A] mb-3 text-sm uppercase tracking-wide">
          Catégorie
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === ""}
              onChange={() => { setSelectedCategory(""); setPage(1); }}
              className="accent-[#C9A227]"
            />
            <span className="text-sm text-gray-700">Tous</span>
          </label>
          {CATEGORIES.map((c) => (
            <label key={c.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === c.value}
                onChange={() => { setSelectedCategory(c.value); setPage(1); }}
                className="accent-[#C9A227]"
              />
              <span className="text-sm text-gray-700">{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-[#1A1A1A] mb-3 text-sm uppercase tracking-wide">
          Marque
        </h3>
        <div className="space-y-2">
          {BRANDS.map((b) => (
            <label key={b} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => { toggleBrand(b); setPage(1); }}
                className="accent-[#C9A227]"
              />
              <span className="text-sm text-gray-700">{b}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-[#1A1A1A] mb-3 text-sm uppercase tracking-wide">
          Genre
        </h3>
        <div className="space-y-2">
          {GENDERS.map((g) => (
            <label key={g.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedGenders.includes(g.value)}
                onChange={() => { toggleGender(g.value); setPage(1); }}
                className="accent-[#C9A227]"
              />
              <span className="text-sm text-gray-700">{g.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-[#1A1A1A] mb-3 text-sm uppercase tracking-wide">
          Prix (DA)
        </h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => { setPriceMin(e.target.value); setPage(1); }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A227]"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => { setPriceMax(e.target.value); setPage(1); }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C9A227]"
          />
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="w-full text-sm text-gray-500 hover:text-[#C9A227] underline transition-colors"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-3xl font-bold text-[#1A1A1A]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Notre Catalogue
          </h1>
          <p className="text-gray-500 mt-1">
            {filtered.length} produit{filtered.length !== 1 ? "s" : ""} trouvé
            {filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Desktop */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <Filters />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm border border-gray-200 rounded-lg px-4 py-2 hover:border-[#C9A227] transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtres
              </button>
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value as SortKey); setPage(1); }}
                className="ml-auto border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#C9A227] bg-white"
              >
                <option value="default">Tri par défaut</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="new">Nouveautés</option>
              </select>
            </div>

            {paginated.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg mb-4">Aucun produit trouvé</p>
                <button onClick={resetFilters} className="text-[#C9A227] underline">
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:border-[#C9A227] transition-colors"
                >
                  Précédent
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      p === page
                        ? "bg-[#C9A227] text-white"
                        : "border border-gray-200 hover:border-[#C9A227]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:border-[#C9A227] transition-colors"
                >
                  Suivant
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-[#1A1A1A]">Filtres</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <Filters />
          </div>
        </div>
      )}
    </div>
  );
}
