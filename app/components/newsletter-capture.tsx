import { useState } from "react";
import { ArrowRight } from "lucide-react";

// Gold accent: #cbb26a   Dark navy: #0f172a   Gray text: #9ca3af
// All colors hardcoded — no CSS variables, no theme tokens, no dark: variants.

export function NewsletterCapture() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div
          className="rounded-xl p-6 md:p-8"
          style={{
            background: "rgba(15, 23, 42, 0.78)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(55, 65, 81, 0.5)",
          }}
        >
          {submitted ? (
            <p
              className="text-center font-medium"
              style={{ color: "#cbb26a" }}
            >
              Thanks! Check your inbox for the Restructuring Playbook.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 items-center">
              {/* Left: copy */}
              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: "#ffffff" }}
                >
                  Get the Restructuring Playbook &mdash; Free
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: "#9ca3af" }}
                >
                  Operator insights, frameworks, and restructuring strategies.
                </p>
              </div>

              {/* Right: form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#cbb26a] placeholder:text-[#6b7280]"
                  style={{
                    border: "1px solid rgba(75, 85, 99, 0.5)",
                    background: "rgba(31, 41, 55, 0.5)",
                    color: "#ffffff",
                  }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-1 px-4 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90 whitespace-nowrap cursor-pointer disabled:opacity-50"
                  style={{
                    backgroundColor: "#cbb26a",
                    color: "#171717",
                    border: "none",
                  }}
                >
                  {submitting ? (
                    <span className="flex items-center gap-1">
                      <svg
                        className="animate-spin h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Sending&hellip;
                    </span>
                  ) : (
                    <>
                      Send It <ArrowRight className="ml-1 h-3 w-3" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
