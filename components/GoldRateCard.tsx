"use client";

import { BRAND } from "@/config/brand";

/**
 * Small "Gold Rate Today" card for the hero (right side on desktop, below the
 * copy on mobile).
 *
 * Figures are config-driven (BRAND.goldRate) so the shop controls the exact
 * numbers on its board -- nothing is fetched or guessed. Renders nothing when
 * goldRate is unset. The share button uses the native Web Share sheet where
 * available and falls back to a WhatsApp share link.
 */
export function GoldRateCard() {
  const rate = BRAND.goldRate;
  if (!rate) return null;

  const shareText =
    `Gold rate at ${BRAND.businessName} (${rate.date}) -- 22K: ${rate.rate22k}/g, 24K: ${rate.rate24k}/g`;

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title: `${BRAND.businessName} gold rate`, text: shareText, url });
        return;
      } catch {
        // dismissed or unsupported -- fall through to WhatsApp
      }
    }
    const wa = `https://wa.me/?text=${encodeURIComponent(url ? `${shareText} ${url}` : shareText)}`;
    if (typeof window !== "undefined") window.open(wa, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-64 max-w-[82vw] rounded-2xl border border-gold/25 bg-background/70 p-4 shadow-xl backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <ellipse cx="12" cy="6" rx="8" ry="3" />
              <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
              <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
            </svg>
          </span>
          <div className="leading-tight">
            <p className="font-sans text-[0.68rem] uppercase tracking-[0.18em] text-gold/85">
              Gold Rate Today
            </p>
            <p className="font-sans text-[0.6rem] text-muted">{rate.date}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleShare}
          aria-label="Share today's gold rate"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors duration-300 hover:border-gold hover:text-gold"
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
          </svg>
        </button>
      </div>

      <dl className="mt-3 space-y-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="font-sans text-xs text-muted">22K &middot; 916</dt>
          <dd className="font-display text-base text-ivory">
            {rate.rate22k}
            <span className="ml-0.5 font-sans text-[0.6rem] text-muted">/g</span>
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="font-sans text-xs text-muted">24K &middot; 999</dt>
          <dd className="font-display text-base text-ivory">
            {rate.rate24k}
            <span className="ml-0.5 font-sans text-[0.6rem] text-muted">/g</span>
          </dd>
        </div>
      </dl>

      <p className="mt-2.5 font-sans text-[0.55rem] leading-snug text-muted/70">
        Indicative retail rate. Please confirm the price in store.
      </p>
    </div>
  );
}
