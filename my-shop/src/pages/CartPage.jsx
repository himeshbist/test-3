import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "../components/ui/button";
import { formatCurrency } from "../lib/utils";
import Separator from "../components/ui/separator";
import QuantityPicker from "../components/QuantityPicker";
import { startCheckout } from "../lib/checkout";
import SmartImage from "../components/SmartImage";

/**
 * Cart page: update/remove items, view totals, and proceed to checkout.
 */
export default function CartPage() {
  const { items, subtotal, updateQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const tax = subtotal * 0.08;
  const shipping = subtotal > 0 ? 8 : 0;
  const total = subtotal + tax + shipping;

  const checkoutFromCart = () => {
    if (!items.length) return;
    startCheckout(items, "cart");
    navigate("/checkout");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Your cart</h1>

      {items.length === 0 ? (
        <div className="text-center text-muted-foreground py-20">
          Your cart is empty.{" "}
          <Link to="/" className="underline">Continue shopping</Link>.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 border rounded-lg p-4">
                <div className="h-24 w-24 overflow-hidden rounded-md border">
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    className="h-24 w-24 overflow-hidden rounded-md border"
                    imgClassName="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-muted-foreground hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-3">
                    <QuantityPicker
                      value={item.qty}
                      setValue={(v) => updateQty(item.id, typeof v === "number" ? v : Number(v))}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={clearCart}>Clear cart</Button>
              <Link to="/" className="text-sm underline text-muted-foreground">Continue shopping</Link>
            </div>
          </div>

          <div className="border rounded-lg p-6 h-fit">
            <h2 className="font-semibold mb-4">Order summary</h2>
            <div className="space-y-2 text-sm">
              <Row label="Subtotal" value={formatCurrency(subtotal)} />
              <Row label="Tax (8%)" value={formatCurrency(tax)} />
              <Row label="Shipping" value={formatCurrency(shipping)} />
              <Separator className="my-2" />
              <Row label="Total" value={formatCurrency(total)} bold />
            </div>
            <Button className="w-full mt-4" onClick={checkoutFromCart}>
              Checkout
            </Button>
          </div>
        </div>
      )}
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