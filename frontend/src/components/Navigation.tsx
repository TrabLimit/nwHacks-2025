import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#e0e6f8]/80 backdrop-blur-md border-b border-[#cbd4f4]">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-semibold text-[#5e5b99] hover:text-[#8d8bd3] transition-colors"
        >
          HIPT
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link
            to="/"
            className={`transition-colors hover:text-[#8d8bd3] ${
              location.pathname === "/"
                ? "text-[#5e5b99]"
                : "text-[#7b7ab8]"
            }`}
          >
            Home
          </Link>
          <Link
            to="/categories"
            className={`transition-colors hover:text-[#8d8bd3] ${
              location.pathname === "/categories"
                ? "text-[#5e5b99]"
                : "text-[#7b7ab8]"
            }`}
          >
            Categories
          </Link>
          <Link
            to="/workout"
            className={`transition-colors hover:text-[#8d8bd3] ${
              location.pathname === "/workout"
                ? "text-[#5e5b99]"
                : "text-[#7b7ab8]"
            }`}
          >
            Workout
          </Link>
          <Link
            to="/pose-detector"
            className={`transition-colors hover:text-[#8d8bd3] ${
              location.pathname === "/pose-detector"
                ? "text-[#5e5b99]"
                : "text-[#7b7ab8]"
            }`}
          >
            Pose Detector
          </Link>
        </div>
      </div>
    </nav>
  );
};
