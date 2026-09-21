"use client";

import React from "react";
import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx";

const sections = [
  {
    leftLabel: "Silence",
    title: <>Absence</>,
    rightLabel: "Silence",
    background: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80",
    audioSrc: "/sfx/click-01.mp3",
  },
  {
    leftLabel: "Essence",
    title: <>Stillness</>,
    rightLabel: "Essence",
    background: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1920&q=80",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  {
    leftLabel: "Rebirth",
    title: <>Growth</>,
    rightLabel: "Rebirth",
    background: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  {
    leftLabel: "Change",
    title: <>Opportunity</>,
    rightLabel: "Change",
    background: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
];

export default function ProjectsSection() {
  return (
    <section className="relative w-full">
      <FullScreenScrollFX
        sections={sections}
        header={<><div>The Creative</div><div>Process</div></>}
        footer={<div>fin</div>}
        showProgress
        durations={{ change: 0.7, snap: 800 }}
      />
    </section>
  );
}
