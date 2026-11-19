"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative bg-ink text-paper border-t border-paper/15 px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-site grid gap-6 text-xs font-bold uppercase tracking-wider text-paper/65 sm:grid-cols-3 items-center">
        <p>© 2026 Spectra Operations Inc.</p>
        <div className="flex gap-6 sm:justify-center">
          <a href="#services" className="transition-colors hover:text-paper">
            Services
          </a>
          <a href="#process" className="transition-colors hover:text-paper">
            Process
          </a>
          <a href="#results" className="transition-colors hover:text-paper">
            Proof
          </a>
          <a href="#faq" className="transition-colors hover:text-paper">
            FAQ
          </a>
        </div>
        <p className="sm:text-right">Outsourcing with savings.</p>
      </div>
    </footer>
  );
}

export default Footer;
export { Footer as SiteFooter };
