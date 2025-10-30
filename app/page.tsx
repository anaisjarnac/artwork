import Image from "next/image";
import Link from "next/link";
import LogoHover from "./components/LogoHover";
import { produits } from "../data/produits";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-[1300px] flex justify-center mb-8">
        <LogoHover />
      </div>

      <div className="grid grid-cols-3 gap-12 max-w-[1300px] w-full">
        {produits.map((produit) => (
          <Link
            key={produit.id}
            href={`/produit/${produit.id}`}
            className="group flex flex-col items-center text-center w-full no-underline text-inherit transition-colors duration-300"
          >
            <div className="relative w-full max-w-[720px] aspect-square mx-auto overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={produit.image}
                alt={produit.nom}
                fill
                className="object-cover shake-target transform transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {produit.nom}
              </h2>
              <p className="text-lg font-medium text-gray-700">
                {produit.prix} €
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
