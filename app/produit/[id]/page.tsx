import { produits } from "../../../data/produits";
import Image from "next/image";
import Link from "next/link";
import AcheterButton from "./AcheterButton";

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
      <div className="w-full max-w-[1300px] relative mb-6">
        <Link
          href="/"
          aria-label="Retour à l'accueil"
          className="absolute left-0 top-1/2 transform -translate-y-1/2"
        >
          <span className="inline-flex items-center justify-center p-2 rounded-full bg-white shadow hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </span>
        </Link>

        <div className="flex justify-center">
          <Image
            src="/images/anais2.png"
            alt="Anaïs"
            width={700}
            height={700}
            className="h-auto w-auto"
          />
        </div>
      </div>
      <div className="w-full max-w-[1300px] flex flex-col md:flex-row items-center md:items-center gap-8">
        <div className="md:w-1/2 flex justify-center">
          <Image
            src={produit.image}
            alt={produit.nom}
            width={600}
            height={600}
            className="rounded-xl max-w-full h-auto"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left px-4">
          <h1 className="text-4xl text-white font-bold">{produit.nom}</h1>
          <p className="text-white my-4 max-w-lg">{produit.description}</p>
          <p className="text-2xl text-white font-semibold mb-6">
            {produit.prix} €
          </p>

          <AcheterButton produit={produit} />
        </div>
      </div>
    </main>
  );
}
