"use client";

import { useEffect, useRef, useState } from "react";

const translations = {
  en: {
    placeholder: "How do you feel? (e.g., floating and in love)",
    summon: "Summon MoodPal",
    download: "Download PNG",
    cast: "Cast on Farcaster",
    gift: "Gift a MoodPal",
    day: "Day",
    feeling: "Feeling",
    sent: "Sent!",
  },
  fr: {
    placeholder: "Comment te sens-tu? (ex: flottant et amoureux)",
    summon: "Appelle MoodPal",
    download: "Télécharger PNG",
    cast: "Caster sur Farcaster",
    gift: "Offrir un MoodPal",
    day: "Jour",
    feeling: "Sensation",
    sent: "Envoyé!",
  },
  es: {
    placeholder: "¿Cómo te sientes? (ej.: flotando y enamorado)",
    summon: "Invoca MoodPal",
    download: "Descargar PNG",
    cast: "Publicar en Farcaster",
    gift: "Regalar un MoodPal",
    day: "Día",
    feeling: "Sensación",
    sent: "¡Enviado!",
  },
  pt: {
    placeholder: "Como você se sente? (ex.: flutuando e apaixonado)",
    summon: "Chamar MoodPal",
    download: "Baixar PNG",
    cast: "Publicar no Farcaster",
    gift: "Presentear um MoodPal",
    day: "Dia",
    feeling: "Sentimento",
    sent: "Enviado!",
  },
  de: {
    placeholder: "Wie fühlst du dich? (z. B.: schwebend und verliebt)",
    summon: "Rufe MoodPal auf",
    download: "PNG herunterladen",
    cast: "Auf Farcaster posten",
    gift: "Ein MoodPal verschenken",
    day: "Tag",
    feeling: "Gefühl",
    sent: "Gesendet!",
  },
  ja: {
    placeholder: "どう感じている？（例：浮いている、恋に落ちている）",
    summon: "MoodPalを呼び出す",
    download: "PNGをダウンロード",
    cast: "Farcasterに投稿",
    gift: "MoodPalを贈る",
    day: "日",
    feeling: "感情",
    sent: "送信済み！",
  },
  ko: {
    placeholder: "어떻게 느끼나요? (예: 떠 있는, 사랑에 빠진)",
    summon: "MoodPal 호출",
    download: "PNG 다운로드",
    cast: "Farcaster에 게시",
    gift: "MoodPal 선물",
    day: "일",
    feeling: "감정",
    sent: "전송 완료!",
  },
  zh: {
    placeholder: "你感觉如何？（例如：漂浮，恋爱）",
    summon: "召唤 MoodPal",
    download: "下载 PNG",
    cast: "在 Farcaster 上发布",
    gift: "赠送 MoodPal",
    day: "天",
    feeling: "感受",
    sent: "已发送！",
  },
  tr: {
    placeholder: "Nasıl hissediyorsun? (örneğin: süzülüyor ve aşık)",
    summon: "MoodPal'ı Çağır",
    download: "PNG İndir",
    cast: "Farcaster'da Paylaş",
    gift: "MoodPal Hediye Et",
    day: "Gün",
    feeling: "Hissetme",
    sent: "Gönderildi!",
  },
  ar: {
    placeholder: "كيف تشعر؟ (مثلاً: تطفو ومحبوب)",
    summon: "استدعاء MoodPal",
    download: "تحميل PNG",
    cast: "نشر على Farcaster",
    gift: "هدية MoodPal",
    day: "يوم",
    feeling: "الشعور",
    sent: "تم الإرسال!",
  },
};

function t(lang: string, key: string) {
  return translations[lang]?.[key] ?? translations.en[key];
}

export default function MoodPalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lang, setLang] = useState("en");
  const [mood, setMood] = useState("love");
  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    const userLang = navigator.language.slice(0, 2);
    setLang(translations[userLang] ? userLang : "en");
    const storedStreak = localStorage.getItem("moodpal_streak");
    const storedDate = localStorage.getItem("moodpal_last");
    if (storedStreak && storedDate) {
      const today = new Date().toDateString();
      if (today === storedDate) {
        setStreak(parseInt(storedStreak));
        setLastDate(storedDate);
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (yesterday.toDateString() === storedDate) {
          setStreak(parseInt(storedStreak) + 1);
          localStorage.setItem("moodpal_streak", (parseInt(storedStreak) + 1).toString());
          localStorage.setItem("moodpal_last", today);
          setLastDate(today);
        } else {
          setStreak(1);
          localStorage.setItem("moodpal_streak", "1");
          localStorage.setItem("moodpal_last", today);
          setLastDate(today);
        }
      }
    } else {
      const today = new Date().toDateString();
      localStorage.setItem("moodpal_streak", "1");
      localStorage.setItem("moodpal_last", today);
      setStreak(1);
      setLastDate(today);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 400;
    canvas.height = 400;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawChibi = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // head
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
      ctx.fill();
      // hair
      ctx.fillStyle = "#8b4513";
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 80, canvas.height / 2 - 80);
      ctx.lineTo(canvas.width / 2 + 80, canvas.height / 2 - 80);
      ctx.lineTo(canvas.width / 2, canvas.height / 2 - 120);
      ctx.closePath();
      ctx.fill();
      // eyes
      const eyeColor = mood === "love" ? "#ff69b4" : mood === "chaos" ? "#ffd700" : mood === "sad" ? "#1e90ff" : "#ff4500";
      ctx.fillStyle = eyeColor;
      ctx.beginPath();
      ctx.arc(canvas.width / 2 - 30, canvas.height / 2 - 20, 20, 0, Math.PI * 2);
      ctx.arc(canvas.width / 2 + 30, canvas.height / 2 - 20, 20, 0, Math.PI * 2);
      ctx.fill();
      // special eye shapes
      if (mood === "love") {
        ctx.fillStyle = "#ff1493";
        ctx.beginPath();
        ctx.arc(canvas.width / 2 - 30, canvas.height / 2 - 20, 10, 0, Math.PI * 2);
        ctx.arc(canvas.width / 2 + 30, canvas.height / 2 - 20, 10, 0, Math.PI * 2);
        ctx.fill();
      } else if (mood === "chaos") {
        ctx.strokeStyle = "#ffd700";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 30, canvas.height / 2 - 20);
        ctx.lineTo(canvas.width / 2 - 30, canvas.height / 2 - 40);
        ctx.moveTo(canvas.width / 2 + 30, canvas.height / 2 - 20);
        ctx.lineTo(canvas.width / 2 + 30, canvas.height / 2 - 40);
        ctx.stroke();
      } else if (mood === "sad") {
        ctx.fillStyle = "#1e90ff";
        ctx.beginPath();
        ctx.arc(canvas.width / 2 - 30, canvas.height / 2 - 20, 10, 0, Math.PI);
        ctx.arc(canvas.width / 2 + 30, canvas.height / 2 - 20, 10, 0, Math.PI);
        ctx.fill();
      } else if (mood === "angry") {
        ctx.fillStyle = "#ff4500";
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 30, canvas.height / 2 - 20);
        ctx.lineTo(canvas.width / 2 - 20, canvas.height / 2 - 10);
        ctx.lineTo(canvas.width / 2 - 30, canvas.height / 2);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + 30, canvas.height / 2 - 20);
        ctx.lineTo(canvas.width / 2 + 20, canvas.height / 2 - 10);
        ctx.lineTo(canvas.width / 2 + 30, canvas.height / 2);
        ctx.closePath();
        ctx.fill();
      }
      // body
      ctx.fillStyle = "#add8e6";
      ctx.beginPath();
      ctx.rect(canvas.width / 2 - 30, canvas.height / 2 + 80, 60, 80);
      ctx.fill();
      // badges
      if (streak >= 30) {
        ctx.fillStyle = "rgba(255,215,0,0.8)";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2 - 120, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Eternal Pal", canvas.width / 2, canvas.height / 2 - 120);
      } else if (streak >= 7) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 40, canvas.height / 2 - 100);
        ctx.lineTo(canvas.width / 2 - 20, canvas.height / 2 - 140);
        ctx.lineTo(canvas.width / 2, canvas.height / 2 - 100);
        ctx.lineTo(canvas.width / 2 + 20, canvas.height / 2 - 140);
        ctx.lineTo(canvas.width / 2 + 40, canvas.height / 2 - 100);
        ctx.closePath();
        ctx.fill();
      } else if (streak >= 3) {
        ctx.fillStyle = "#ffd700";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2 - 120, 15, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    drawChibi();

    const blink = () => {
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setTimeout(() => {
        ctx.globalAlpha = 1;
        drawChibi();
      }, 200);
    };
    const blinkInterval = setInterval(blink, 3500);
    return () => clearInterval(blinkInterval);
  }, [mood, streak]);

  const handleSummon = () => {
    const text = inputRef.current?.value.toLowerCase() ?? "";
    let newMood = "love";
    if (text.includes("chaos")) newMood = "chaos";
    else if (text.includes("sad") || text.includes("melancholy")) newMood = "sad";
    else if (text.includes("angry")) newMood = "angry";
    setMood(newMood);
    setGenerated(true);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "moodpal.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleCast = () => {
    const text = inputRef.current?.value ?? "";
    const castText = `${t(lang, "day")} ${streak} – ${t(lang, "feeling")} ${text} #MoodPal`;
    // simulate Farcaster cast
    alert(`Casted: ${castText}`);
  };

  const handleGift = () => {
    const address = prompt("Enter wallet address to gift:");
    if (address) alert(t(lang, "sent"));
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-2">
      <input
        ref={inputRef}
        type="text"
        placeholder={t(lang, "placeholder")}
        className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        onClick={handleSummon}
        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition-opacity"
      >
        {t(lang, "summon")}
      </button>
      <canvas
        ref={canvasRef}
        className="border rounded-md w-full max-w-md h-64"
      />
      {generated && (
        <div className="flex flex-col gap-2">
          <button
            onClick={handleDownload}
            className="text-sm text-purple-600 hover:underline"
          >
            {t(lang, "download")}
          </button>
          <button
            onClick={handleCast}
            className="text-sm text-purple-600 hover:underline"
          >
            {t(lang, "cast")}
          </button>
          <button
            onClick={handleGift}
            className="text-sm text-purple-600 hover:underline"
          >
            {t(lang, "gift")}
          </button>
        </div>
      )}
      <div className="mt-4">
        <p>{t(lang, "day")} {streak}</p>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 365 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded ${
                i < streak ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
