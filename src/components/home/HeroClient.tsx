"use client";

import dynamic from "next/dynamic";

const GlobeCanvas = dynamic(() => import("./GlobeCanvas"), { ssr: false });
const TypewriterText = dynamic(() => import("./TypewriterText"), { ssr: false });

export default function HeroClient() {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>

      {/* Left half: rotating globe */}
      <div style={{
        width: "50%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <GlobeCanvas />
      </div>

      {/* Right half: title + typewriter */}
      <div style={{
        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        paddingRight: "4rem",
      }}>

        {/* Title — pops in from its own center */}
        <div className="hero-pop-in" style={{ textAlign: "center", display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="Molecule"
            style={{
              display: "block",
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              margin: "0 auto",
            }}
          />
          <div style={{
            color: "#1e6fad",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontSize: "clamp(2rem, 2.4vw, 1.65rem)",
          }}>
            VENTURES
          </div>
        </div>

        {/* Typewriter tagline */}
        <TypewriterText />
      </div>

    </div>
  );
}
