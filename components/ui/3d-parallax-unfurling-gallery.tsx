"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

const imagePool: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", alt: "Meja kerja dengan laptop dan perlengkapan pengembangan web" },
  { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71", alt: "Tampilan analisis data di layar komputer" },
  { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", alt: "Kode program pada monitor" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", alt: "Tim berdiskusi di sekitar meja kerja" },
  { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", alt: "Sekelompok orang bekerja dengan laptop" },
  { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2", alt: "Ruang kerja modern dengan meja panjang" },
  { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902", alt: "Tim berkolaborasi di ruang kerja" },
  { src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5", alt: "Laptop terbuka di meja kerja" },
  { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72", alt: "Interior kantor dengan area duduk" },
  { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3", alt: "Perangkat digital di atas meja" },
  { src: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28", alt: "Orang menggunakan perangkat digital saat bekerja" },
  { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c", alt: "Tim sedang mengerjakan proyek bersama" },
  { src: "https://images.unsplash.com/photo-1500534623283-312aade485b7", alt: "Pemandangan alam dengan bukit" },
  { src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e", alt: "Danau di tengah pegunungan" },
  { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e", alt: "Pemandangan pegunungan" },
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", alt: "Pemandangan danau dan pegunungan" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba", alt: "Gunung di bawah langit malam" },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", alt: "Pepohonan di hutan" },
  { src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf", alt: "Pemandangan kota pada malam hari" },
  { src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963", alt: "Bangunan berwarna di kawasan kota" },
  { src: "https://images.unsplash.com/photo-1480796927426-f609979314bd", alt: "Jalanan kota dengan bangunan di sekitarnya" },
  { src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f", alt: "Suasana konser musik" },
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac", alt: "Sekelompok teman berkumpul" },
  { src: "https://images.unsplash.com/photo-1534447677768-be436bb09401", alt: "Langit malam berbintang" },
];

function pickRandomImages(pool: GalleryImage[], count: number) {
  const shuffled = [...pool];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled.slice(0, count);
}

function ImageCard({ image, decorative = false }: { image: GalleryImage; decorative?: boolean }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-lg bg-bg-secondary sm:h-56 md:h-72 lg:h-80">
      {failed ? (
        <span className="flex h-full items-center justify-center px-4 text-center text-sm text-text-secondary">
          Foto tidak tersedia
        </span>
      ) : (
        <Image
          src={image.src}
          alt={decorative ? "" : image.alt}
          fill
          sizes="(max-width: 639px) 55vw, (max-width: 1023px) 45vw, 25vw"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function GalleryColumn({
  items,
  y,
  className,
}: {
  items: GalleryImage[];
  y?: ReturnType<typeof useTransform<number, string>>;
  className?: string;
}) {
  return (
    <motion.div style={{ y }} className={`flex min-w-0 flex-col gap-3 sm:gap-4 md:gap-6 ${className ?? ""}`}>
      {[...items, ...items].map((image, index) => (
        <ImageCard key={`${image.src}-${index}`} image={image} decorative={index >= items.length} />
      ))}
    </motion.div>
  );
}

function ParallaxStage({ images }: { images: GalleryImage[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const desktopColumns = Array.from({ length: 4 }, (_, index) =>
    images.filter((_, imageIndex) => imageIndex % 4 === index),
  );
  const mobileColumns = Array.from({ length: 2 }, (_, index) =>
    images.filter((_, imageIndex) => imageIndex % 2 === index),
  );
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.5 });

  const width = useTransform(progress, [0, 0.16], ["92vw", "100vw"]);
  const height = useTransform(progress, [0, 0.16], ["78dvh", "100dvh"]);
  const borderRadius = useTransform(progress, [0, 0.16], ["24px", "0px"]);
  const rotateY = useTransform(progress, [0.16, 1], [-35, -5]);
  const rotateX = useTransform(progress, [0.16, 1], [18, 3]);
  const rotateZ = useTransform(progress, [0.16, 1], [10, 1]);
  const depth = useTransform(progress, [0.16, 1], [-500, 0]);
  const yCol1 = useTransform(progress, [0.16, 1], ["0%", "-25%"]);
  const yCol2 = useTransform(progress, [0.16, 1], ["-20%", "8%"]);
  const yCol3 = useTransform(progress, [0.16, 1], ["0%", "-25%"]);
  const yCol4 = useTransform(progress, [0.16, 1], ["-20%", "8%"]);

  return (
    <div ref={stageRef} className="relative h-[300dvh] md:h-[420dvh]">
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
        <motion.div
          style={{ width, height, borderRadius }}
          className="relative mx-auto flex max-w-[1920px] items-center justify-center overflow-hidden bg-bg-secondary"
        >
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1000px" }}>
            <motion.div
              style={{ rotateX, rotateY, rotateZ, z: depth, transformStyle: "preserve-3d" }}
              className="hidden h-[150dvh] w-[130vw] grid-cols-4 items-center gap-6 md:grid"
            >
              {desktopColumns.map((items, index) => (
                <GalleryColumn
                  key={index}
                  items={items}
                  y={[yCol1, yCol2, yCol3, yCol4][index]}
                />
              ))}
            </motion.div>
            <motion.div
              style={{ rotateX, rotateY, rotateZ, z: depth, transformStyle: "preserve-3d" }}
              className="grid h-[150dvh] w-[125vw] grid-cols-2 items-center gap-3 sm:w-[105vw] sm:gap-4 md:hidden"
            >
              {mobileColumns.map((items, index) => (
                <GalleryColumn key={index} items={items} y={index === 0 ? yCol1 : yCol2} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ParallaxUnfurlingGallery() {
  const reduceMotion = useReducedMotion();
  const [images, setImages] = useState(() => imagePool.slice(0, 12));

  useEffect(() => {
    const timeout = window.setTimeout(() => setImages(pickRandomImages(imagePool, 12)), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative z-20 bg-bg-primary text-text-primary">
      <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-16 md:px-12 md:pb-14 md:pt-24">
        <h2 id="gallery-title" className="text-3xl font-bold tracking-tight md:text-5xl">Galeri visual</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
          Pilihan foto acak dari Unsplash. Susunannya berubah setiap kali halaman dibuka.
        </p>
      </div>
      {reduceMotion ? (
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-3 px-6 pb-16 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-6 md:px-12 md:pb-24">
          {images.map((image) => <ImageCard key={image.src} image={image} />)}
        </div>
      ) : (
        <ParallaxStage images={images} />
      )}
    </section>
  );
}
