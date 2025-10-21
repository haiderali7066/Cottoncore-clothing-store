// app/checkout/page.js
import CheckoutClient from "./CheckoutClient";

export const dynamic = "force-dynamic"; // ensure this page is fully dynamic

export default function CheckoutPage() {
  return <CheckoutClient />;
}
