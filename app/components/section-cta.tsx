import { Link } from "react-router";
import { BookingModal } from "~/components/booking-modal";

// Gold accent: #cbb26a   Dark navy: #0f172a   Grid lines: rgba(203,178,106,0.06)
// All colors hardcoded — no CSS variables, no theme tokens, no dark: variants.

interface SectionCTAProps {
  headline: string;
  supporting?: string;
  showDiagnostic?: boolean;
}

export function SectionCTA({
  headline,
  supporting,
  showDiagnostic = true,
}: SectionCTAProps) {
  return (
    <section
      className="py-14"
      style={{
        borderTop: "1px solid rgba(55, 65, 81, 0.4)",
        background: "rgba(15, 23, 42, 0.93)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div className="container mx-auto px-4">
        <div
          className="pl-6 grid md:grid-cols-2 gap-8 items-center"
          style={{ borderLeft: "3px solid #cbb26a" }}
        >
          {/* Left: headline + supporting text */}
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: "#ffffff" }}
            >
              {headline}
            </h2>
            {supporting && (
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#9ca3af" }}
              >
                {supporting}
              </p>
            )}
          </div>

          {/* Right: CTA buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:justify-end">
            <BookingModal>
              <button
                className="px-7 py-3 rounded-md text-base font-semibold cursor-pointer transition-opacity hover:opacity-90 active:opacity-75 whitespace-nowrap"
                style={{
                  backgroundColor: "#cbb26a",
                  color: "#171717",
                  border: "none",
                }}
              >
                Book a Call
              </button>
            </BookingModal>
            {showDiagnostic && (
              <Link
                to="/services/diagnostic"
                className="px-7 py-3 rounded-md text-base font-medium transition-colors hover:bg-white/10 whitespace-nowrap inline-flex items-center justify-center"
                style={{
                  border: "1.5px solid #cbb26a",
                  color: "#ffffff",
                  backgroundColor: "transparent",
                }}
              >
                Get the Diagnostic
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
