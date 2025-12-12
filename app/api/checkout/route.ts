import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
});

type CartItem = {
  id: number | string;
  nom: string;
  prix: number;
  qty?: number;
};

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();

    // Support both legacy single-item requests and new array payload
    const items: CartItem[] = Array.isArray(body.items)
      ? body.items
      : body.produitId
      ? [
          {
            id: body.produitId,
            nom: body.nom ?? `Produit ${body.produitId}`,
            prix: body.amount || 0,
            qty: 1,
          },
        ]
      : [];

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Aucun article fourni pour le paiement." },
        { status: 400 }
      );
    }

    // Filter out items without numeric price
    const validItems = items.filter(
      (it) =>
        typeof it.prix === "number" && !Number.isNaN(it.prix) && it.prix > 0
    );
    if (validItems.length === 0) {
      return NextResponse.json(
        { error: "Aucun article valide avec prix numérique." },
        { status: 400 }
      );
    }

    const line_items = validItems.map((it) => ({
      price_data: {
        currency: "eur",
        product_data: { name: it.nom },
        unit_amount: Math.round(it.prix * 100),
      },
      quantity: it.qty && it.qty > 0 ? it.qty : 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      invoice_creation: {
        enabled: true,
      },
      // Redirect back to the site root so users land on the home page after Stripe
      success_url: `${process.env.NEXT_PUBLIC_URL ?? ""}/?stripe=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL ?? ""}/?stripe=cancel`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Impossible de créer la session Stripe." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erreur Stripe :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session Stripe." },
      { status: 500 }
    );
  }
}
