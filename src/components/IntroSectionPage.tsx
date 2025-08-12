"use client"
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

export default function IntroSectionPage() {
  const colors = [
    "bg-white/5 shadow-[0_0_12px_#ffffff10]",
    "bg-cyan-400/5 shadow-[0_0_12px_#06b6d410]",
    "bg-purple-400/5 shadow-[0_0_12px_#a855f710]",
  ];

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-gray-950 via-slate-950 to-[hsl(240,27%,6%)] h-screen flex items-end gap-8 px-10 overflow-hidden">
      {/* 🔤 Typewriter Overlay using react-typewriter-effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-3xl sm:text-4xl font-semibold whitespace-nowrap text-cyan-500 shadow-lg shadow-cyan-500/40 text-shadow-lg text-shadow-cyan-500/40">
        <Typewriter
          words={['Launching portfolio in a moment...']}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={60}
          deleteSpeed={40}
          delaySpeed={1500}
        />
      </div>

      {/* 🎨 Animated Columns */}
      {[...Array(9)].map((_, colIndex) => (
        <div
          key={colIndex}
          className={`flex flex-col gap-6 ${colIndex % 4 === 0
              ? "translate-y-0"
              : colIndex % 4 === 1
                ? "translate-y-12"
                : colIndex % 4 === 2
                  ? "-translate-y-8"
                  : "translate-y-16"
            }`}
        >
          {[...Array(6)].map((_, boxIndex) => {
            const style = colors[(boxIndex + colIndex) % 3];
            const delay = (colIndex * 0.15 + boxIndex * 0.05).toFixed(2);

            return (
              <div
                key={boxIndex}
                className={`h-40 w-40 rounded-lg opacity-0 ${mounted ? "fade-up" : ""} ${style}`}
                style={{
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      ))}

      {/* 🧵 Keyframes for Fade Animation */}
      <style>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-up {
          animation: fadeUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}