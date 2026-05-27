import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PRICE_CENTS = 1900; // $19 community membership

export async function POST(request: Request) {
  let body: { name?: string; email?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const email = body.email?.trim();
  const name = body.name?.trim() ?? "";
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const origin =
    request.headers.get("origin") ??
    new URL(request.url).origin;

  const key = process.env.STRIPE_SECRET_KEY;
  if (key) {
    try {
      const { default: Stripe } = await import("stripe");
      const stripe = new Stripe(key);
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: email,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: PRICE_CENTS,
              product_data: {
                name: "IQCDL Community Membership",
                description:
                  "Community access, AI Quantum Guide chat, free features and a 10% course discount.",
              },
            },
          },
        ],
        metadata: { name },
        success_url: `${origin}/membership/success?cs={CHECKOUT_SESSION_ID}&e=${encodeURIComponent(email)}&n=${encodeURIComponent(name)}`,
        cancel_url: `${origin}/membership?canceled=1`,
      });
      return NextResponse.json({ url: session.url, mode: "live" });
    } catch (err) {
      console.error("Stripe checkout failed:", err);
      return NextResponse.json(
        { error: "Payment setup failed" },
        { status: 502 },
      );
    }
  }

  // No Stripe key — demo mode: skip straight to fulfillment.
  return NextResponse.json({ mode: "demo" });
}
