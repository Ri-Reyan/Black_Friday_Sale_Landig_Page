import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;

const getEndTime = () => {
  const saved = localStorage.getItem("bf_timer_v1");
  if (saved) return Number(saved);

  const time = Date.now() + FIVE_DAYS;
  localStorage.setItem("bf_timer_v1", time);
  return time;
};

const calcTimeLeft = (end) => {
  const diff = Math.max(0, end - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff <= 0,
  };
};

const Box = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="font-extrabold text-5xl md:text-6xl lg:text-7xl"
    >
      {String(value).padStart(2, "0")}
    </motion.span>
    <p className="uppercase text-xs md:text-sm tracking-wider mt-2 text-gray-300">
      {label}
    </p>
  </div>
);

const BlackFriday = () => {
  const endRef = useRef(getEndTime());
  const [t, setT] = useState(calcTimeLeft(endRef.current));

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setT(calcTimeLeft(endRef.current));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setMsg({ type: "error", text: "Enter a valid email." });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMsg({ type: "success", text: "Saved! UI-only demo." });
      setEmail("");
      setTimeout(() => setMsg({ type: "", text: "" }), 3000);
    }, 800);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-white px-6 py-12 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-semibold text-center tracking-wide"
      >
        SOMETHING BIG IS
        <span className="block md:inline ml-2">COMING</span>
      </motion.h1>

      {/* Countdown */}
      <div className="mt-10 w-full max-w-4xl bg-white/5 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center">
        <div className="flex gap-6 flex-wrap justify-center">
          <Box label="days" value={t.days} />
          <Box label="hours" value={t.hours} />
          <Box label="minutes" value={t.minutes} />
          <Box label="seconds" value={t.seconds} />
        </div>

        <p className="text-sm text-gray-400 mt-4">
          {t.done ? "Sale is live!" : "Countdown to our biggest sale ever"}
        </p>
      </div>

      {/* Sub text */}
      <p className="text-center text-gray-300 mt-8 max-w-xl">
        Be the first to know. Drop your email — we’ll ping you when we launch.
      </p>

      {/* Form */}
      <form
        onSubmit={submit}
        className="mt-6 w-full max-w-xl flex flex-col gap-3"
      >
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 h-14 rounded-md text-black focus:ring-2 focus:ring-yellow-300 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 h-14 rounded-md bg-yellow-400 text-black font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Notify"}
          </button>
        </div>

        <AnimatePresence>
          {msg.text && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className={`text-sm ${
                msg.type === "error" ? "text-red-400" : "text-green-400"
              }`}
            >
              {msg.text}
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      <p className="text-xs text-gray-400 mt-4">
        This is a UI-only demo. Backend integration available on request.
      </p>
    </section>
  );
};

export default BlackFriday;
