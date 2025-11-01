import { produits } from "../../../data/produits";
import Image from "next/image";
import Link from "next/link";
import AcheterButton from "./AcheterButton";
import GalleryClient from "../../components/GalleryClient";
import AddToCartButton from "../../components/AddToCartButton";

export default async function ProduitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produit = produits.find((p) => p.id === Number(id));

  if (!produit) return <div>Produit introuvable</div>;

  return (
    <main className="min-h-screen bg-[#4b5ae4] p-8 flex flex-col items-center">
      <div className="w-full max-w-[1300px] relative mb-6 pointer-events-none">
        <Link
          href="/"
          aria-label="Retour à l'accueil"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-0 pointer-events-auto hidden md:block"
        >
          <Image
            src="/images/arrow.png"
            alt="back"
            width={70}
            height={70}
            className="h-auto w-auto"
          />
        </Link>

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
              className="h-auto w-auto"
            />
          </Link>
        </div>
      </div>

      <GalleryClient images={produit.images} />

      <div className="w-full max-w-[1300px] mt-6 px-4">
        <h1 className="text-4xl text-white font-bold">{produit.nom}</h1>
        <p className="text-white my-4 max-w-lg">{produit.description}</p>
        <AcheterButton produit={produit} />
        <AddToCartButton produit={produit} />
      </div>
    </main>
  );
}
