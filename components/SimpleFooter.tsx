import React from "react";
import Link from "next/link";

interface SimpleFooterProps {
  className?: string;
}

export default function SimpleFooter({ className = "" }: SimpleFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className={`w-full border-t border-border bg-bg-primary text-text-secondary ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & role */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <Link
              href="/"
              className="text-base font-bold text-text-primary hover:text-accent transition-colors"
            >
              Mohamad Arif
            </Link>
            <span className="hidden sm:inline text-border">|</span>
            <span className="text-xs sm:text-sm text-text-secondary">
              Web Developer &amp; Data Enthusiast
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 text-xs sm:text-sm flex-wrap justify-center">
            <a
              href="https://github.com/mohamadarif03"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mohamad-arif-68402627a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/mhmdarif346/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
            >
              Instagram
            </a>
            <a
              href="mailto:mohamadarif5392@gmail.com"
              className="hover:text-text-primary transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        {/* Bottom copyright & status badge */}
        <div className="mt-6 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-secondary/80">
          <p>© {currentYear} Mohamad Arif. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>Open for collaboration &amp; opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
