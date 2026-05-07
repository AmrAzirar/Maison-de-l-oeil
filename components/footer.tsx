import Link from "next/link";
import { MapPin, Phone, Mail, Globe, Globe2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3
              className="text-[#C9A227] font-bold text-xl mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Optique Maison de l&apos;Œil
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre boutique d&apos;optique haut de gamme, au service de votre
              vision depuis 2010. Qualité, élégance et expertise.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 text-[#C9A227] shrink-0 mt-0.5" />
                <span>12 Rue Didouche Mourad, Alger Centre, Algérie</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="h-4 w-4 text-[#C9A227] shrink-0" />
                <span>+213 21 23 45 67</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4 text-[#C9A227] shrink-0" />
                <span>contact@maisondeoeil.dz</span>
              </div>
            </div>
          </div>

          {/* Links + Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <div className="space-y-2 mb-6">
              <Link
                href="/"
                className="block text-gray-400 hover:text-[#C9A227] text-sm transition-colors"
              >
                Accueil
              </Link>
              <Link
                href="/catalogue"
                className="block text-gray-400 hover:text-[#C9A227] text-sm transition-colors"
              >
                Catalogue
              </Link>
              <Link
                href="/contact"
                className="block text-gray-400 hover:text-[#C9A227] text-sm transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/panier"
                className="block text-gray-400 hover:text-[#C9A227] text-sm transition-colors"
              >
                Panier
              </Link>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#C9A227] transition-colors"
                aria-label="Instagram"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#C9A227] transition-colors"
                aria-label="Facebook"
              >
                <Globe2 className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Optique Maison de l&apos;Œil. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
