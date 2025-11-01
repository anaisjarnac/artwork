import Link from "next/link";
import Image from "next/image";

export default function SuccessPage() {
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
              className="w-16 h-16 mx-auto text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Merci pour votre commande ! 🎉
          </h1>

          <p className="text-gray-600 mb-6">
            Votre paiement a été effectué avec succès. Vous recevrez bientôt un
            email de confirmation avec les détails de votre commande.
          </p>

          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
