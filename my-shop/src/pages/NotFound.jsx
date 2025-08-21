import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground mt-2">
        The page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className="inline-block mt-6 underline text-sm">Go home</Link>
    </div>
  );
}