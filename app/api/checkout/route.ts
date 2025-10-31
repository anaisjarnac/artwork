import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
});

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Récupère les infos envoyées depuis le front
    const body = await req.json();
    const { produitId, format, amount } = body;

    if (!amount || !format || !produitId) {
      return NextResponse.json(
        { error: "Paramètres manquants dans la requête." },
        { status: 400 }
      );
    }

    // Crée la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Print ${format.toUpperCase()} — ID ${produitId}`,
            },
            unit_amount: amount * 100, // Montant en centimes
          },
          quantity: 1,
        },
      ],
      success_url: `${
        process.env.NEXT_PUBLIC_URL ?? ""
      }/stripe-payment-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL ?? ""}/cancel`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Impossible de créer la session Stripe." },
        { status: 500 }
      );
    }

    // Retourne l’URL Stripe au front
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erreur Stripe :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session Stripe." },
      { status: 500 }
    );
  }
}
