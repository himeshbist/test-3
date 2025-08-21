import { useEffect, useMemo, useState } from "react";
import Input from "../components/ui/input";
import Label from "../components/ui/label";
import Separator from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { formatCurrency } from "../lib/utils";
import { clearCheckout, loadCheckout } from "../lib/checkout";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import SmartImage from "../components/SmartImage";

/**
 * Checkout page:
 * - Reads items from sessionStorage (set by Buy Now or Cart checkout)
 * - Simple shipping form
 * - On submit, simulates order and optionally clears cart if source === "cart"
 */
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [checkout, setCheckout] = useState(loadCheckout());

  useEffect(() => {
    setCheckout(loadCheckout());
  }, []);

  const items = checkout?.items ?? [];
  const source = checkout?.source ?? "single";

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 0 ? 8 : 0;
  const total = subtotal + tax + shipping;

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  if (!items.length) {
    return (
      <div className="text-center text-muted-foreground py-20">
        No items in checkout. <Link to="/" className="underline">Return to store</Link>.
      </div>
    );
  }

  const placeOrder = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.city || !form.zip) {
      toast.error("Please fill out all fields");
      return;
    }
    // Simulate order
    setTimeout(() => {
      if (source === "cart") {
        clearCart();
      }
      clearCheckout();
      toast.success("Order placed!", { description: "A confirmation email has been sent." });
      navigate("/");
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <form onSubmit={placeOrder} className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="zip">ZIP/Postal</Label>
            <Input id="zip" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
          </div>
        </div>
        <Button type="submit" className="mt-2">Place order</Button>
      </form>

      <aside className="border rounded-lg p-6 h-fit">
        <h2 className="font-semibold mb-4">Order summary</h2>
        <div className="space-y-4">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="h-14 w-14 overflow-hidden rounded-md border">
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    className="h-14 w-14 overflow-hidden rounded-md border"
                    imgClassName="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium line-clamp-1">{item.title}</div>
                  <div className="text-xs text-muted-foreground">Qty {item.qty}</div>
                </div>
                <div className="text-sm">{formatCurrency(item.price * item.qty)}</div>
              </div>
            ))}
          </div>
          <Separator />
          <div className="space-y-2 text-sm">
            <Row label="Subtotal" value={formatCurrency(subtotal)} />
            <Row label="Tax (8%)" value={formatCurrency(tax)} />
            <Row label="Shipping" value={formatCurrency(shipping)} />
            <Separator className="my-2" />
            <Row label="Total" value={formatCurrency(total)} bold />
          </div>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className={"flex items-center justify-between " + (bold ? "font-semibold" : "")}>
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}