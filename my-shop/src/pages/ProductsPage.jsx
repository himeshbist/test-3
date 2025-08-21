import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Separator from "../components/ui/separator";
import { products } from "../data/products";

/**
 * Products page: shows the full product catalog with optional search via ?q=
 */
export default function ProductsPage() {
  const location = useLocation();
  const q = new URLSearchParams(location.search).get("q")?.toLowerCase() ?? "";

  const filtered = useMemo(() => {
    if (!q) return products;
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [q]);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {q ? `Search results for “${q}”` : "All products"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
        {q && (
          <Link
            to="/products"
            className="text-sm text-muted-foreground underline"
            aria-label="Clear search"
          >
            Clear search
          </Link>
        )}
      </header>

      <Separator />

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-16">
            No products match your search. <Link to="/products" className="underline">View all</Link>.
          </div>
        )}
      </section>
    </div>
  );
}