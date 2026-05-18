"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_ITEMS, SITE, type NavItem } from "@/data/site-config";

function NavLink({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  const cls = "flex items-center gap-1 text-sm text-gray-600 hover:text-brand transition-colors";
  if (item.download || item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={cls} onClick={onClick}>
      {item.label}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-350 mx-auto px-6 flex h-16 items-center justify-between">
        <Link href="/">
          <Image src={SITE.logo} alt={SITE.name} width={160} height={40} className="h-6 w-auto" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="nav-item relative group">
              {item.children ? (
                <>
                  {/* Top-level link with animated underline */}
                  <Link
                    href={item.href}
                    className="nav-top-link flex items-center gap-1.5 px-3 py-2 text-[13px] font-bold uppercase tracking-wide text-brand"
                  >
                    {item.label}
                    <ChevronDown size={17} strokeWidth={2.8} />
                  </Link>
                  {/* Dropdown panel */}
                  <div className="nav-dropdown absolute top-full left-0 mt-0 w-56 bg-white shadow-lg ring-1 ring-black/5 py-1 rounded-b">
                    {item.children.map((child) => (
                      <div key={child.label} className="px-4 py-2.5">
                        <NavLink item={child} />
                      </div>
                    ))}
                  </div>
                </>
              ) : item.download ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-top-link px-3 py-2 text-[13px] font-bold uppercase tracking-wide text-brand"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="nav-top-link px-3 py-2 text-[13px] font-bold uppercase tracking-wide text-brand"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="lg:hidden border-t bg-white max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-bold text-brand uppercase"
                      onClick={() => setDropdown(dropdown === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        strokeWidth={2.8}
                        className={`transition-transform ${dropdown === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {dropdown === item.label && (
                      <div className="ml-4 pl-3 border-l-2 border-brand space-y-1">
                        {item.children.map((child) => (
                          <div key={child.label} className="py-2">
                            <NavLink item={child} onClick={() => setOpen(false)} />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="px-3 py-2.5">
                    <NavLink item={item} onClick={() => setOpen(false)} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
