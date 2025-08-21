import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Search, Github } from "lucide-react";
import { Button } from "./ui/button";
import Input from "./ui/input";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";
import Logo from "./Logo"; // <-- add this import

export default function Navbar() {
  const { count: cartCount } = useCart();
  const { count: favCount } = useWishlist();
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    navigate("/products?q=" + encodeURIComponent(q.trim()));
  };

  return (
    <header className="border-b sticky top-0 bg-background/80 backdrop-blur z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand: updated to a refined logomark + wordmark */}
        <Link to="/" aria-label="MyShop home" className="flex items-center">
          <Logo size={28} withWordmark />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavItem to="/" label="Home" />
          <NavItem to="/products" label="Products" />
          <NavItem to="/wishlist" label={`Wishlist (${favCount})`} />
          <NavItem to="/cart" label={`Cart (${cartCount})`} />
        </nav>

        <form onSubmit={onSearch} className="hidden md:flex items-center gap-2 w-1/2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="pl-9"
            />
          </div>
          <Button type="submit" variant="secondary">Search</Button>
        </form>

        <div className="flex items-center gap-2 md:hidden">
          <Link to="/wishlist" className="relative">
            <Heart className="h-6 w-6" />
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center">
                {favCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "text-muted-foreground hover:text-foreground transition-colors " +
        (isActive ? "text-foreground font-medium" : "")
      }
      end={to === "/"}
    >
      {label}
    </NavLink>
  );
}