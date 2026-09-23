"use client";

import * as React from "react";
import { AnimatePresence, motion, type PanInfo, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];
  initialIndex?: number;
  maxVisible?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  springStiffness?: number;
  springDamping?: number;
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
  className?: string;
  onChangeIndex?: (index: number, item: T) => void;
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  return len > 0 ? ((n % len) + len) % len : 0;
}

// Choose the shortest path around the stack when looping.
function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 5,
  cardWidth = 520,
  cardHeight = 340,
  overlap = 0.56,
  spreadDeg = 34,
  perspectivePx = 1100,
  depthPx = 80,
  tiltXDeg = 7,
  activeLiftPx = 18,
  activeScale = 1.02,
  inactiveScale = 0.94,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = React.useState(cardWidth + 48);
  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len));
  const [hovering, setHovering] = React.useState(false);
  const safeActive = wrapIndex(active, len);

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const updateWidth = () => setStageWidth(stage.clientWidth);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (len) onChangeIndex?.(safeActive, items[safeActive]!);
  }, [items, len, onChangeIndex, safeActive]);

  const isNarrow = stageWidth < 640;
  const visibleLimit = isNarrow ? Math.min(maxVisible, 3) : maxVisible;
  const maxOffset = Math.max(0, Math.floor(visibleLimit / 2));
  const width = Math.min(cardWidth, Math.max(260, stageWidth - (isNarrow ? 40 : 64)));
  const height = Math.min(cardHeight, Math.max(220, Math.round(width * 0.65)));
  const spacing = isNarrow
    ? Math.max(22, Math.round(width * 0.09))
    : Math.max(72, Math.round(width * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;
  const canGoPrev = loop || safeActive > 0;
  const canGoNext = loop || safeActive < len - 1;

  const prev = React.useCallback(() => {
    if (len && canGoPrev) setActive((current) => wrapIndex(current - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (len && canGoNext) setActive((current) => wrapIndex(current + 1, len));
  }, [canGoNext, len]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const actions: Record<string, () => void> = {
      ArrowLeft: prev,
      ArrowRight: next,
      Home: () => setActive(0),
      End: () => setActive(len - 1),
    };
    if (actions[event.key]) {
      event.preventDefault();
      actions[event.key]();
    }
  };

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len || (pauseOnHover && hovering)) return;
    const id = window.setInterval(() => {
      if (loop || safeActive < len - 1) next();
    }, Math.max(700, intervalMs));
    return () => window.clearInterval(id);
  }, [autoAdvance, hovering, intervalMs, len, loop, next, pauseOnHover, reduceMotion, safeActive]);

  if (!len) return null;
  const activeItem = items[safeActive]!;

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        ref={stageRef}
        className="relative w-full overflow-clip rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        style={{ height: height + (isNarrow ? 56 : 88) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="Riwayat pengalaman pilihan"
      >
        <div
          className="pointer-events-none absolute inset-x-[12%] bottom-5 h-24 rounded-[50%] bg-black/35 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, index) => {
              const offset = signedOffset(index, safeActive, len, loop);
              const distance = Math.abs(offset);
              if (distance > maxOffset) return null;

              const x = offset * spacing;
              const y = distance * (isNarrow ? 6 : 10);
              const z = -distance * depthPx;
              const rotateZ = offset * stepDeg;
              const isActive = offset === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (
                      _event: MouseEvent | TouchEvent | PointerEvent,
                      info: PanInfo,
                    ) => {
                      if (reduceMotion) return;
                      const threshold = Math.min(140, width * 0.2);
                      if (info.offset.x > threshold || info.velocity.x > 650) prev();
                      else if (info.offset.x < -threshold || info.velocity.x < -650) next();
                    },
                  }
                : {};

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  className={cn(
                    "absolute bottom-0 overflow-hidden rounded-xl border bg-bg-secondary text-left select-none",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                    isActive
                      ? "cursor-grab border-accent shadow-[0_24px_70px_rgba(0,0,0,0.45)] active:cursor-grabbing"
                      : "cursor-pointer border-border",
                  )}
                  style={{
                    width,
                    height,
                    zIndex: 100 - distance,
                    transformStyle: "preserve-3d",
                  }}
                  initial={reduceMotion ? false : { opacity: 0, y: y + 28, x, rotateZ, scale }}
                  animate={{
                    opacity: 1,
                    x,
                    y: y + (isActive ? -activeLiftPx : 0),
                    rotateZ,
                    rotateX: isActive ? 0 : tiltXDeg,
                    scale,
                  }}
                  transition={reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: springStiffness, damping: springDamping }}
                  onClick={() => setActive(index)}
                  aria-label={`${item.title}${isActive ? ", dipilih" : ", pilih kartu"}`}
                  aria-pressed={isActive}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{ transform: `translateZ(${z}px)`, transformStyle: "preserve-3d" }}
                  >
                    {renderCard
                      ? renderCard(item, { active: isActive })
                      : <DefaultFanCard item={item} active={isActive} />}
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {activeItem.title}, kartu {safeActive + 1} dari {len}
      </p>

      {showDots ? (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          <NavButton label="Kartu sebelumnya" onClick={prev} disabled={!canGoPrev}>
            <ChevronLeft className="size-5" aria-hidden="true" />
          </NavButton>
          <div className="flex items-center" aria-label="Pilih kartu">
            {items.map((item, index) => {
              const selected = index === safeActive;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className="group inline-flex size-11 items-center justify-center rounded-lg"
                  aria-label={`Buka ${item.title}`}
                  aria-current={selected ? "true" : undefined}
                >
                  <span className={cn(
                    "block rounded-full transition-all",
                    selected
                      ? "h-2.5 w-6 bg-accent"
                      : "size-2.5 bg-text-secondary group-hover:bg-text-primary",
                  )} />
                </button>
              );
            })}
          </div>
          <NavButton label="Kartu berikutnya" onClick={next} disabled={!canGoNext}>
            <ChevronRight className="size-5" aria-hidden="true" />
          </NavButton>
          {activeItem.href ? (
            <Link
              href={activeItem.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary"
              aria-label={activeItem.ctaLabel ?? `Buka ${activeItem.title}`}
            >
              <SquareArrowOutUpRight className="size-5" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function NavButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex size-11 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-35"
      aria-label={label}
    >
      {children}
    </button>
  );
}

function DefaultFanCard({ item, active }: { item: CardStackItem; active: boolean }) {
  return (
    <div className="relative h-full w-full bg-bg-secondary">
      {item.imageSrc ? (
        <img
          src={item.imageSrc}
          alt=""
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300",
            active ? "opacity-90" : "opacity-55",
          )}
          draggable={false}
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm text-text-secondary">
          Pratinjau belum tersedia
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-black/85 p-5 sm:p-6">
        {item.tag ? (
          <p className="mb-2 text-xs font-medium tracking-[0.08em] text-blue-300">
            {item.tag}
          </p>
        ) : null}
        <h3 className="text-lg font-semibold tracking-[-0.01em] text-white sm:text-xl">
          {item.title}
        </h3>
        {item.description ? (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/80">
            {item.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
