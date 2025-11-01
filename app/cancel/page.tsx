import Link from "next/link";
import Image from "next/image";

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-[#4b5ae4] flex flex-col items-center justify-center p-8">
      <div className="max-w-lg text-center">
        <div className="mb-6 flex justify-center">
          <Link href="/" className="inline-block">
            <Image
              src="/images/anais2.png"
              alt="Anaïs"
              width={300}
              height={300}
              className="h-auto w-auto"
            />
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Commande annulée
          </h1>

          <p className="text-gray-600 mb-6">
            Votre commande a été annulée. Aucun montant n&apos;a été débité.
            Vous pouvez revenir à tout moment pour finaliser votre achat.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
