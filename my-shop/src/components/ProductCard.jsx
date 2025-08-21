import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Badge from "./ui/badge";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../lib/utils";
import { startCheckout } from "../lib/checkout";
import { toast } from "sonner";
import SmartImage from "./SmartImage";

/**
 * ProductCard shows product details with wishlist + cart actions.
 */
export default function ProductCard({ product }) {
  const { isFavorite, toggle } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const onAdd = () => {
    addToCart(product, 1);
    toast.success("Added to cart", { description: product.title });
  };

  const onBuyNow = () => {
    startCheckout([{ id: product.id, title: product.title, price: product.price, image: product.image, qty: 1 }], "single");
    navigate("/checkout");
  };

  return (
    <Card className="overflow-hidden group">
      <Link to={`/product/${product.id}`} aria-label={`Open ${product.title}`}>
        <div className="relative aspect-[4/3] overflow-hidden">

          <SmartImage
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="relative aspect-[4/3]"
            imgClassName="transition-transform duration-300 group-hover:scale-105"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
            }}
            aria-label="Toggle favorite"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow"
          >
            <Heart
              className={"h-5 w-5 " + (isFavorite(product.id) ? "fill-red-500 text-red-500" : "text-gray-700")}
            />
          </button>
        </div>
      </Link>
      <CardHeader className="p-4">
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="line-clamp-1">{product.title}</span>
          <Badge>{product.category}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
        <p className="line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between gap-2">
        <div className="text-base font-semibold">{formatCurrency(product.price)}</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onAdd}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
          <Button size="sm" onClick={onBuyNow}>
            Buy now
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}