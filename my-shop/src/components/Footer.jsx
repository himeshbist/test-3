import { Link } from "react-router-dom";
import { Github, Twitter, Mail } from "lucide-react";
import Input from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Logo from "./Logo";

/**
 * Site Footer with quick links, newsletter, and socials.
 */
export default function Footer() {
  const onSubscribe = (e) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    if (!email) return;
    toast.success("Thanks for subscribing!", { description: "We’ll keep you posted." });
    e.currentTarget.reset();
  };

  return (
    <footer className="border-t mt-12 bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" aria-label="MyShop home" className="inline-flex items-center">
              <Logo size={28} withWordmark />
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              India’s modern shopping destination for gifts, personalized products, and everyday essentials. Secure checkout, great prices, and fast delivery.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-sm font-semibold">Shop</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:underline">All products</Link></li>
              <li><Link to="/wishlist" className="hover:underline">Wishlist</Link></li>
              <li><Link to="/cart" className="hover:underline">Cart</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold">Help</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:underline">Shipping & returns</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
              <li><a href="#" className="hover:underline">Privacy policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold">Stay in the loop</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Subscribe for offers, new arrivals, and gift ideas—straight to your inbox.
            </p>
            <form onSubmit={onSubscribe} className="mt-3 flex gap-2">
              <Input type="email" name="email" placeholder="you@example.com" aria-label="Email address" />
              <Button type="submit">Subscribe</Button>
            </form>
            <div className="mt-4 flex items-center gap-4 text-muted-foreground">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 hover:text-foreground" />
              </a>
              <a href="mailto:hello@example.com" aria-label="Email">
                <Mail className="h-5 w-5 hover:text-foreground" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 hover:text-foreground" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-xs text-muted-foreground">
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}