import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import Separator from "../components/ui/separator";
import { products } from "../data/products";
import { ShieldCheck, Truck, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

/**
 * Home page:
 * - Hero section with carousel + intro text
 * - Quick feature strip
 * - A small Featured products grid (only a few)
 */
export default function Home() {
  // Show a few featured items on the home page
  const featured = products.slice(0, 4);

  const slides = [
    {
      kicker: "Modern e‑commerce",
      title: "Discover products you’ll love",
      subtitle: "Smooth cart & wishlist, responsive UI, and a clean checkout experience.",
      image:
        "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1600&auto=format&fit=crop",
      ctaTo: "/products",
      ctaLabel: "Shop all products",
    },
    {
      kicker: "Curated picks",
      title: "Hand‑selected items for everyday life",
      subtitle: "Beautiful design meets practicality — furniture, audio, home and more.",
      image:
        "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1600&auto=format&fit=crop",
      ctaTo: "/products",
      ctaLabel: "Browse catalog",
    },
    {
      
      kicker: "New Arrivals",
      title: "Explore Our Latest Collection",
      subtitle: "Shop the latest trends in fashion, electronics, and more.",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop",
      ctaTo: "/products",
      ctaLabel: "Shop Now",
    
    },
  ];

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section>
        <Carousel slides={slides} />
      </section>

      {/* Feature strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Feature
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Secure & snappy"
          desc="Reliable cart, wishlist, and checkout flow with local persistence."
        />
        <Feature
          icon={<Truck className="h-5 w-5" />}
          title="Fast shipping"
          desc="Sample tax and shipping calculations in the order summary."
        />
        <Feature
          icon={<Sparkles className="h-5 w-5" />}
          title="Modern UI"
          desc="Responsive layout, accessible controls, and polished interactions."
        />
      </section>

      <Separator />

      {/* Featured products */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Featured products</h2>
            <p className="text-muted-foreground text-sm">A small selection from our catalog.</p>
          </div>
          <Button asChild variant="secondary">
            <Link to="/products">View all</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border p-4 bg-card">
      <div className="mt-0.5 text-primary">{icon}</div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}