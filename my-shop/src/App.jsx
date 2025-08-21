import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFound from "./pages/NotFound";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

/**
 * App sets up global providers, the navbar, routes, footer, and toaster notifications.
 */
export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="container mx-auto px-4 py-6 flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster richColors closeButton position="top-right" />
      </CartProvider>
    </WishlistProvider>
  );
}