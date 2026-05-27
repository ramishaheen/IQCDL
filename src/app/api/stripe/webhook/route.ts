import { NextResponse } from "next/server";
import { getStripeKey, getStripeWebhookSecret } from "@/lib/settings-server";
import { setMemberStatusByCustomer, upsertMember } from "@/lib/members-server";

export const runtime = "nodejs";

// Stripe requires the raw, unparsed body for signature verification.
export async function POST(request: Request) {
  const key = await getStripeKey();
  const webhookSecret = await getStripeWebhookSecret();
  if (!key || !webhookSecret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const raw = await request.text();
  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(key);

  let event: import("stripe").Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(raw, sig, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object;
        const product = (s.metadata?.product as string) || "membership";
        // Only membership purchases activate a recurring member record.
        if (product === "membership") {
          await upsertMember({
            email: s.customer_email || s.customer_details?.email || "",
            name: (s.metadata?.name as string) || s.customer_details?.name || "Member",
            product,
            stripeCustomerId: typeof s.customer === "string" ? s.customer : undefined,
          });
        }
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object;
        const customer = typeof sub.customer === "string" ? sub.customer : sub.customer?.id;
        if (customer) await setMemberStatusByCustomer(customer, "canceled");
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error("Stripe webhook handling failed:", err);
    // Acknowledge anyway so Stripe doesn't hammer retries on our processing bug.
  }

  return NextResponse.json({ received: true });
}
