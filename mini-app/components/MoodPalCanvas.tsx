"use client";

import { useEffect, useRef } from "react";

export default function MoodPalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const drawChibi = (mood: string) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // head
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
      ctx.fill();
      // eyes
      ctx.fillStyle =
        mood === "love" ? "pink" : mood === "chaos" ? "yellow" : "blue";
      ctx.beginPath();
      ctx.arc(canvas.width / 2 - 20, canvas.height / 2 - 10, 10, 0, Math.PI * 2);
      ctx.arc(canvas.width / 2 + 20, canvas.height / 2 - 10, 10, 0, Math.PI * 2);
      ctx.fill();
    };

    const summonBtn = document.getElementById("summonBtn");
    const downloadBtn = document.getElementById("downloadBtn");

    summonBtn?.addEventListener("click", () => {
      const text = inputRef.current?.value.toLowerCase() ?? "";
      let mood = "love";
      if (text.includes("chaos")) mood = "chaos";
      if (text.includes("melancholy")) mood = "melancholy";
      drawChibi(mood);
    });

    downloadBtn?.addEventListener("click", () => {
      if (!canvas) return;
      const link = document.createElement("a");
      link.download = "moodpal.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }, []);

  return (
    <div className="w-full max-w-md flex flex-col gap-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="How do you feel? (e.g., floating and in love)"
        className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        id="summonBtn"
        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition-opacity"
      >
        Summon MoodPal
      </button>
      <canvas
        ref={canvasRef}
        className="border rounded-md w-full max-w-md h-64"
      />
      <button
        id="downloadBtn"
        className="text-sm text-purple-600 hover:underline"
      >
        Download PNG
      </button>
      <style jsx>{`
        @keyframes blink {
          0%,
          50%,
          100% {
            opacity: 1;
          }
          25%,
          75% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
