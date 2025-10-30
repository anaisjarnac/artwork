import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
});

type CheckoutItem = {
  name: string;
  amount: number;
};

export async function POST(req: Request): Promise<NextResponse> {
  const body = (await req.json()) as { items: CheckoutItem[] };
  const { items } = body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: item.amount * 100,
      },
      quantity: 1,
    })),
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL ?? ""}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL ?? ""}/cancel`,
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Could not create checkout session" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: session.url });
}
