import LogoHover from "./components/LogoHover";
import SearchButton from "./components/SearchButton";
import CartButton from "./components/page-produit/CartButton";
import { produits } from "../data/produits";
import ProductsGrid from "./components/ProductsGrid";
import StripeSuccessModal from "./components/StripeSuccessModal";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8 futuristic-content homepage-gradient">
      <Suspense fallback={null}>
        <StripeSuccessModal />
      </Suspense>
      <div className="w-full max-w-[1300px] flex flex-col md:flex-row items-center justify-center mb-12 gap-4">
        {/* Mobile: cart button on top right, Logo below */}
        <div className="flex items-center md:hidden w-full justify-end">
          <CartButton />
        </div>

        {/* Desktop: Logo centered with buttons on right */}
        <div className="w-full md:relative flex items-center justify-center">
          <LogoHover />
          <div className="hidden md:flex md:absolute right-0 items-center gap-4 z-50">
            <SearchButton produits={produits} />
            <CartButton />
          </div>
        </div>
      </div>

      <ProductsGrid produits={produits} />
      {/* <ScrollToTop /> */}
    </main>
  );
}
