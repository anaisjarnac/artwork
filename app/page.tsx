import LogoHover from "./components/LogoHover";
import SearchButton from "./components/SearchButton";
import CartButton from "./components/CartButton";
import { produits } from "../data/produits";
import ProductsGrid from "./components/ProductsGrid";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-[1300px] flex items-center justify-center mb-8 relative">
        <div className="absolute left-0"></div>
        <LogoHover />
        <div className="absolute right-0 flex items-center gap-4">
          <SearchButton produits={produits} />
          <CartButton />
        </div>
      </div>

      <ProductsGrid produits={produits} />
    </main>
  );
}
