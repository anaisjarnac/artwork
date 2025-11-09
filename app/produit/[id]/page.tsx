import { produits } from "../../../data/produits";
import Image from "next/image";
import Link from "next/link";
import GalleryClient from "../../components/page-produit/GalleryClient";
import AddToCartButton from "../../components/page-produit/AddToCartButton";
import CartButton from "../../components/page-produit/CartButton";
import { ProductDetailProvider } from "../../components/ProductDetailProvider";
import PriceCards from "../../components/page-produit/PriceCards";
import type { Product } from "../../../types/Product";
import { ArrowLeft } from "lucide-react";
import { monoTrust, poppins } from "../../fonts";
import { useWindowSize } from "@/app/hooks/use-window-size";
import MobileTitleBlock from "@/app/components/page-produit/title/MobileTitleBlock";
import DesktopTitleBlock from "@/app/components/page-produit/title/DesktopTitleBlock";

export default async function ProduitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produit = produits.find((p) => p.id === Number(id)) as
    | Product
    | undefined;

  if (!produit) return <div>Produit introuvable</div>;

  const isSoldToile = typeof produit.prix !== "number";
  const hasA4 = typeof produit.prix_print_A4 === "number";
  const hasA3 = typeof produit.prix_print_A3 === "number";
  const hasCarte = typeof produit.prix_carte === "number";
  const isSold = isSoldToile && !hasA4 && !hasA3 && !hasCarte;

  return (
    <ProductDetailProvider>
      <main className="min-h-screen bg-[#4b5ae4] pt-2 px-4 pb-4 md:pt-3 md:px-6 md:pb-6 flex flex-col items-center">
        <div className="w-full max-w-[1300px] ">
          <div className="relative mb-2 pointer-events-none">
            <div className="absolute top-3 right-3 md:top-14">
              <CartButton />
            </div>
            {/* </div> */}

            <Link
              href="/"
              aria-label="Retour à l'accueil"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-0 pointer-events-auto hidden md:block"
            >
              <ArrowLeft
                size={40}
                className="text-white hover:text-gray-300 transition-colors"
              />
            </Link>

            {/* Desktop: Cart button on top right */}
            {/* <div className="hidden md:flex md:absolute right-0 top-1/2 transform -translate-y-1/2 z-0 pointer-events-auto">
              <CartButton />
            </div> */}

            <div className="flex justify-center">
              <Link
                href="/"
                aria-label="Retour à l'accueil"
                className="relative z-50 inline-block pointer-events-auto"
              >
                <Image
                  src="/images/anais2.png"
                  alt="Anaïs"
                  width={700}
                  height={700}
                  className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] object-contain"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-x-18 md:justify-center">
            <div className=" flex flex-col gap-2">
              {/* Titre en mode mobile uniquement */}
              <h1 className="hidden">{produit.nom}</h1>
              <MobileTitleBlock title={produit.nom} />
              <GalleryClient
                images={produit.images}
                images_print={produit.images_print}
                images_toile={produit.images_toile}
                images_carte={produit.images_carte}
              />
            </div>

            {/* Description et bouton d'ajout au panier */}
            <div className="pb-12 flex flex-col justify-center items-center md:items-start text-center md:text-left order-2 md:order-2">
              <div className="w-full">
                <p
                  className={`${poppins.className} text-white text-lg mb-6 max-w-lg font-medium`}
                >
                  {produit.description}
                </p>

                <DesktopTitleBlock title={produit.nom} />

                <PriceCards produit={produit} />

                {isSold ? (
                  <p className="text-xl text-red-400 font-semibold">Vendu 🖤</p>
                ) : (
                  <AddToCartButton
                    produit={{ ...produit, prix: produit.prix! }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProductDetailProvider>
  );
}
