import { Link } from "react-router";
import { useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "announcement-dismissed";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem(STORAGE_KEY) !== "true";
  });

  if (!visible) return null;

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  return (
    <div className="announcement-slide bg-gray-950 py-2 px-4 text-sm flex items-center justify-center gap-2 relative">
      <span className="text-yellow-400/90">
        New: Free Restructuring Diagnostic &mdash; Limited spots for Q1 2025
      </span>
      <Link
        to="/services/diagnostic"
        className="text-yellow-300 font-semibold hover:text-yellow-100 transition-colors duration-150 flex-shrink-0"
        aria-label="Learn more about the free restructuring diagnostic"
      >
        &rarr;
      </Link>
      <button
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-400/70 hover:text-yellow-200 transition-colors duration-150"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
