import { useParams, useNavigate } from "react-router-dom";
import { productsById } from "../data/products";
import { useState } from "react";
import QuantityPicker from "../components/QuantityPicker";
import { Button } from "../components/ui/button";
import Badge from "../components/ui/badge";
import Separator from "../components/ui/separator";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../lib/utils";
import { startCheckout } from "../lib/checkout";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import SmartImage from "../components/SmartImage";

/**
 * Dedicated Product Page with responsive layout and full actions.
 */
export default function ProductPage() {
  const { id } = useParams();
  const product = productsById[id];
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const { isFavorite, toggle } = useWishlist();
  const { addToCart } = useCart();

  if (!product) {
    return <div className="text-center text-muted-foreground py-20">Product not found.</div>;
  }

  const onAdd = () => {
    addToCart(product, qty);
    toast.success("Added to cart", { description: `${product.title} × ${qty}` });
  };

  const onBuyNow = () => {
    startCheckout([{ id: product.id, title: product.title, price: product.price, image: product.image, qty }], "single");
    navigate("/checkout");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="rounded-lg overflow-hidden border">
        <SmartImage
          src={product.image}
          alt={product.title}
          loading="eager"
          className="w-full h-full rounded-lg overflow-hidden"
          imgClassName="object-cover"
        />
      </div>

      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">{product.title}</h1>
            <div className="mt-2 flex items-center gap-3">
              <Badge>{product.category}</Badge>
              <span className="text-sm text-muted-foreground">⭐ {product.rating}</span>
              <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
            </div>
          </div>
          <button
            onClick={() => toggle(product.id)}
            className="h-10 w-10 flex items-center justify-center rounded-full border"
            aria-label="Toggle favorite"
          >
            <Heart className={"h-5 w-5 " + (isFavorite(product.id) ? "fill-red-500 text-red-500" : "")} />
          </button>
        </div>

        <Separator className="my-6" />

        <p className="text-muted-foreground">{product.description}</p>

        <div className="mt-6 text-3xl font-semibold">{formatCurrency(product.price)}</div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <QuantityPicker value={qty} setValue={setQty} />
          <Button variant="outline" onClick={onAdd}>
            Add to cart
          </Button>
          <Button onClick={onBuyNow}>Buy now</Button>
        </div>
      </div>
    </div>
  );
}