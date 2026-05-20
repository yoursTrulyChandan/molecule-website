"use client";
import { useEffect, useState } from "react";

const FULL_TEXT =
  "Molecule forms the essence of all research, connecting together to form the most complex structures. Inspired from Molecule, we focus on connecting multiple dots of information and knowledge, to simplify investment ideas.";

// Title animation is 0.7s + 0.1s delay = 0.8s. Start typing after that.
const START_DELAY_MS = 900;
const CHAR_INTERVAL_MS = 32;

export default function TypewriterText() {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), START_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= FULL_TEXT.length) return;
    const t = setTimeout(() => {
      setDisplayed(FULL_TEXT.slice(0, displayed.length + 1));
    }, CHAR_INTERVAL_MS);
    return () => clearTimeout(t);
  }, [started, displayed]);

  return (
    <p className="text-lg sm:text-xl italic font-semibold text-center max-w-130 text-brand leading-[1.1]">
      {displayed}
    </p>
  );
}
