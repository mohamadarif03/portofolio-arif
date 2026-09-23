"use client";

import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

const items: CardStackItem[] = [
  {
    id: "pbm-agency",
    title: "Fullstack Developer",
    description: "PBM Agency, 2026 sampai sekarang",
    imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
    tag: "PBM Agency",
  },
  {
    id: "bcc-community",
    title: "Data Science",
    description: "BCC Community, 2026 sampai sekarang",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    tag: "BCC Community",
  },
  {
    id: "jobnation",
    title: "Web Developer",
    description: "Jobnation.id, 2025 sampai 2026",
    imageSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=85",
    tag: "Jobnation.id",
  },
  {
    id: "hummatech",
    title: "Web Developer & Tech Mentor",
    description: "PT Hummatech, 2023 sampai 2025",
    imageSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85",
    tag: "PT Hummatech",
  },
];

export default function CardStackDemo() {
  return (
    <section
      id="projects"
      aria-labelledby="selected-work-title"
      className="relative z-20 w-full bg-bg-primary px-6 py-14 sm:py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-8 max-w-2xl md:mb-12">
          <p className="mb-3 text-sm font-medium text-blue-300">Pengalaman pilihan</p>
          <h2
            id="selected-work-title"
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.02em] text-text-primary"
          >
            Peran yang membentuk cara saya membangun produk.
          </h2>
          <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-text-secondary md:text-lg">
            Pilih kartu, gunakan tombol arah, atau geser kartu aktif untuk melihat
            perjalanan kerja saya.
          </p>
        </div>
        <CardStack items={items} initialIndex={0} maxVisible={5} showDots />
      </div>
    </section>
  );
}
