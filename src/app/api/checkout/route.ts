import { NextResponse } from "next/server";
import { getStripeKey } from "@/lib/settings-server";

export const runtime = "nodejs";

type Product = "membership" | "gqa_award" | "gqa_assessment";

interface PlanDef {
  cents: number;
  recurring?: "year";
  name: string;
  description: string;
}

const PLANS: Record<Product, PlanDef> = {
  membership: {
    cents: 1900,
    recurring: "year",
    name: "IQCDL Community Membership (yearly)",
    description:
      "Verified members: community, AI expert agents, Quantum Guide chat, a free course and 10% course discount.",
  },
  gqa_award: {
    cents: 100000, // $1,000 — SME / government / open international categories
    name: "Global Quantum Award — category submission",
    description:
      "AI-assessed award submission for SMEs, governments and open international categories.",
  },
  gqa_assessment: {
    cents: 500000, // $5,000 — full entity quantum-readiness assessment
    name: "Global Quantum Award — entity AI assessment",
    description:
      "Full AI assessment of an entity's quantum-readiness pillars against international standards.",
  },
};

export async function POST(request: Request) {
  let body: { name?: string; email?: string; product?: Product; meta?: Record<string, string> } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const email = body.email?.trim();
  const name = body.name?.trim() ?? "";
  const product: Product = body.product ?? "membership";
  const plan = PLANS[product];
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }
  if (!plan) {
    return NextResponse.json({ error: "Unknown product" }, { status: 400 });
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  const successPath =
    product === "membership"
      ? `/membership/success?cs={CHECKOUT_SESSION_ID}&e=${encodeURIComponent(email)}&n=${encodeURIComponent(name)}`
      : `/awards/success?cs={CHECKOUT_SESSION_ID}&p=${product}`;
  const cancelPath = product === "membership" ? "/membership?canceled=1" : "/awards?canceled=1";

  const key = await getStripeKey();
  if (key) {
    try {
      const { default: Stripe } = await import("stripe");
      const stripe = new Stripe(key);
      const session = await stripe.checkout.sessions.create({
        mode: plan.recurring ? "subscription" : "payment",
        customer_email: email,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: plan.cents,
              ...(plan.recurring ? { recurring: { interval: plan.recurring } } : {}),
              product_data: { name: plan.name, description: plan.description },
            },
          },
        ],
        metadata: { name, product, ...(body.meta ?? {}) },
        success_url: `${origin}${successPath}`,
        cancel_url: `${origin}${cancelPath}`,
      });
      return NextResponse.json({ url: session.url, mode: "live" });
    } catch (err) {
      console.error("Stripe checkout failed:", err);
      return NextResponse.json({ error: "Payment setup failed" }, { status: 502 });
    }
  }

  // No Stripe key — demo mode: skip straight to fulfillment.
  return NextResponse.json({ mode: "demo", product });
}
