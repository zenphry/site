import { useEffect, useState } from "react";

interface LinePulse {
  id: number;
  type: "vertical" | "horizontal";
  position: number;
  duration: number;
  delay: number;
}

function generateRandomLinePulse(id: number): LinePulse {
  const type = Math.random() > 0.5 ? "vertical" : "horizontal";
  const gridSize = 40;
  const viewportSize =
    typeof window !== "undefined"
      ? type === "vertical"
        ? window.innerWidth
        : window.innerHeight
      : 1200;
  const gridCount = Math.floor(viewportSize / gridSize);
  const gridIndex = Math.floor(Math.random() * gridCount);

  return {
    id,
    type,
    position: gridIndex * gridSize,
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 3,
  };
}

export function BackgroundPulses() {
  const [pulses, setPulses] = useState<LinePulse[]>(() => {
    const pulseCount = 8 + Math.floor(Math.random() * 5);
    return Array.from({ length: pulseCount }, (_, i) =>
      generateRandomLinePulse(i),
    );
  });

  useEffect(() => {
    const driftInterval = setInterval(() => {
      setPulses((prevPulses) =>
        prevPulses.map((pulse) => generateRandomLinePulse(pulse.id)),
      );
    }, 15000);

    return () => clearInterval(driftInterval);
  }, []);

  return (
    <>
      {pulses.map((pulse) => (
        <div
          key={pulse.id}
          className="absolute pointer-events-none transition-all duration-[15000ms] ease-in-out"
          style={{
            ...(pulse.type === "vertical"
              ? {
                  left: `${pulse.position}px`,
                  top: 0,
                  width: "2px",
                  height: "100%",
                }
              : {
                  left: 0,
                  top: `${pulse.position}px`,
                  width: "100%",
                  height: "2px",
                }),
            animation: `linePulse ${pulse.duration}s ease-in-out ${pulse.delay}s infinite`,
          }}
        >
          <div
            className="w-full h-full bg-gradient-to-b dark:bg-gradient-to-b"
            style={{
              background:
                pulse.type === "vertical"
                  ? "linear-gradient(to bottom, transparent, rgba(203,178,106,0.4), transparent)"
                  : "linear-gradient(to right, transparent, rgba(203,178,106,0.4), transparent)",
              filter: "blur(1px)",
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes linePulse {
          0%, 100% {
            opacity: 0;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
      `}</style>
    </>
  );
}
