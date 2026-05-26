"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SITE_NAV_ITEMS } from "@/lib/site-nav";

type SiteNavProps = {
  onNavigate: (sectionId: string) => void;
  onContact: () => void;
};

export function SiteNav({ onNavigate, onContact }: SiteNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    setMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/20 bg-background/90 backdrop-blur-xl supports-[padding:max(0px)]:pt-[max(0px,env(safe-area-inset-top))]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-16 lg:py-6">
        <button
          type="button"
          onClick={() => handleNavigate("highlights")}
          className="flex min-w-0 items-center gap-4 text-left transition-opacity hover:opacity-80"
        >
          <div className="hidden h-8 w-px shrink-0 bg-primary/40 sm:block" />
          <span className="truncate text-[9px] font-medium uppercase tracking-[0.28em] text-primary sm:tracking-[0.4em]">
            <span className="sm:hidden">Gross House</span>
            <span className="hidden sm:inline">Exclusive Listing</span>
          </span>
        </button>

        <div className="hidden items-center gap-14 lg:flex">
          {SITE_NAV_ITEMS.map((item) => (
            <button
              key={item.sectionId}
              type="button"
              onClick={() => handleNavigate(item.sectionId)}
              className="text-[12px] uppercase tracking-[0.08em] text-muted-foreground transition-all duration-500 hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="h-11 gap-2 border-primary/50 bg-primary/10 px-3.5 text-[11px] font-medium uppercase tracking-[0.1em] text-primary shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-primary hover:bg-primary/20 hover:text-primary lg:hidden sm:px-4"
                aria-label="Open site menu"
              >
                <Menu className="h-4 w-4 shrink-0" strokeWidth={2.25} />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[min(100vw-2rem,320px)] flex-col border-border/30 bg-background px-0">
              <SheetHeader className="border-b border-border/20 px-6 pb-5 pt-2 text-left">
                <SheetTitle className="font-serif text-xl font-normal text-foreground">
                  The Historic Gross House
                </SheetTitle>
                <SheetDescription className="text-[13px] text-muted-foreground">
                  Navigate the listing
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-1 flex-col gap-1 px-4 py-6">
                {SITE_NAV_ITEMS.map((item) => (
                  <button
                    key={item.sectionId}
                    type="button"
                    onClick={() => handleNavigate(item.sectionId)}
                    className="rounded-xl px-4 py-4 text-left text-[13px] font-medium uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-primary/8"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="border-t border-border/20 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <Button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onContact();
                  }}
                  className="h-12 w-full bg-primary text-[11px] font-medium uppercase tracking-[0.1em] text-primary-foreground hover:bg-primary/90"
                >
                  Contact Broker
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Button
            type="button"
            onClick={onContact}
            className="h-11 border border-primary/40 bg-transparent px-5 text-[11px] uppercase tracking-[0.1em] text-primary transition-all duration-500 hover:bg-primary hover:text-primary-foreground sm:px-8"
          >
            Contact
          </Button>
        </div>
      </div>
    </nav>
  );
}
