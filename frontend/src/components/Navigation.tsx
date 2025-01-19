import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          Fitness
        </Link>
        <div className="flex gap-6">
          <Link
            to="/"
            className={`transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/categories"
            className={`transition-colors hover:text-primary ${
              location.pathname === "/categories"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Categories
          </Link>
          <Link
            to="/workout"
            className={`transition-colors hover:text-primary ${
              location.pathname === "/workout"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Workout
          </Link>
        </div>
      </div>
    </nav>
  );
};
