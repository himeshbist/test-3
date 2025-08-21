import { useWishlist } from "../context/WishlistContext";
import { productsById } from "../data/products";
import ProductCard from "../components/ProductCard";

/**
 * Wishlist page: shows favorited products with same card controls.
 */
export default function WishlistPage() {
  const { ids } = useWishlist();
  const items = ids.map((id) => productsById[id]).filter(Boolean);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Your wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center text-muted-foreground py-20">No favorites yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}