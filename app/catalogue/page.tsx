import { Suspense } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CatalogueContent from "./catalogue-content";

export default function CataloguePage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-gray-400">Chargement du catalogue...</div>
          </div>
        }
      >
        <CatalogueContent />
      </Suspense>
      <Footer />
    </>
  );
}
