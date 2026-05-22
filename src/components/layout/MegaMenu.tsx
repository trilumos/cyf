"use client";

import Link from "next/link";
import { useState } from "react";
import { IconChevronRight, IconLayoutGrid } from "@tabler/icons-react";
import { CATEGORIES } from "@/data/categories";
import { getByCategory, type Calculator } from "@/data/calculators";

// ─── Trending ────────────────────────────────────────────────────────────────

const TRENDING = [
  { label: "Old vs New Tax Regime", slug: "new-vs-old-tax-regime-calculator" },
  { label: "FIRE Calculator",       slug: "fire-calculator" },
  { label: "SIP Step-Up",           slug: "step-up-sip-calculator" },
  { label: "Home Loan EMI",         slug: "home-loan-emi-calculator" },
  { label: "Currency Converter",    slug: "currency-converter" },
];

function TrendingPill({ label, slug, onClose }: { label: string; slug: string; onClose: () => void }) {
  const [h, setH] = useState(false);
  return (
    <Link
      href={`/calculators/${slug}/`}
      onClick={onClose}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        border: `0.5px solid ${h ? "#1B4FD8" : "#e5e7eb"}`,
        borderRadius: "20px",
        padding: "4px 12px",
        fontSize: "11.5px",
        color: h ? "#1B4FD8" : "#374151",
        background: h ? "#EEF2FF" : "#ffffff",
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "all 0.1s",
      }}
    >
      {label}
    </Link>
  );
}

// ─── Left panel row ───────────────────────────────────────────────────────────

function CategoryRow({
  id, label, count, isActive, onActivate,
}: {
  id: string; label: string; count: number; isActive: boolean; onActivate: (id: string) => void;
}) {
  const [h, setH] = useState(false);

  const bg          = isActive ? "#ffffff"    : h ? "#f3f4f6" : "transparent";
  const borderColor = isActive ? "#1B4FD8"    : h ? "#d1d5db" : "transparent";
  const textColor   = isActive ? "#1B4FD8"    : "#374151";
  const weight      = isActive ? 600          : 400;
  const countColor  = isActive ? "rgba(27,79,216,0.6)" : "#9ca3af";
  const chevColor   = isActive ? "#1B4FD8"    : "#d1d5db";

  return (
    <button
      role="option"
      aria-selected={isActive}
      onMouseEnter={() => { setH(true); onActivate(id); }}
      onMouseLeave={() => setH(false)}
      onClick={() => onActivate(id)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "10px 16px",
        gap: "10px",
        background: bg,
        border: "none",
        borderLeft: `3px solid ${borderColor}`,
        cursor: "pointer",
        textAlign: "left" as const,
        outline: "none",
        transition: "all 0.1s",
      }}
    >
      <span style={{ flex: 1, fontSize: "12.5px", color: textColor, fontWeight: weight }}>
        {label}
      </span>
      <span style={{ fontSize: "10.5px", color: countColor }}>{count}</span>
      <IconChevronRight size={10} style={{ color: chevColor, flexShrink: 0 }} />
    </button>
  );
}

// ─── Tool row ─────────────────────────────────────────────────────────────────

function ToolRow({ name, description, slug, onClose }: {
  name: string; description: string; slug: string; onClose: () => void;
}) {
  const [h, setH] = useState(false);
  return (
    <Link
      href={`/calculators/${slug}/`}
      onClick={onClose}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 20px",
        gap: "8px",
        background: h ? "#EEF2FF" : "transparent",
        textDecoration: "none",
        cursor: "pointer",
        transition: "background 0.08s",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1, minWidth: 0 }}>
        <span style={{
          fontSize: "12px",
          fontWeight: 500,
          color: h ? "#1B4FD8" : "#1f2937",
          lineHeight: "1.3",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {name}
        </span>
        <span style={{ fontSize: "10px", color: "#b0b7c3", lineHeight: "1.2" }}>
          {description}
        </span>
      </div>
      <IconChevronRight
        size={10}
        style={{
          flexShrink: 0,
          color: "#1B4FD8",
          opacity: h ? 1 : 0,
          transition: "opacity 0.08s",
        }}
      />
    </Link>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MegaMenu({ onClose }: { onClose: () => void }) {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];
  const tools  = getByCategory(active.slug);

  // Split tools into 3 vertical columns
  const chunkSize = Math.ceil(tools.length / 3);
  const columns: Calculator[][] = [
    tools.slice(0, chunkSize),
    tools.slice(chunkSize, chunkSize * 2),
    tools.slice(chunkSize * 2),
  ];

  return (
    <div
      role="navigation"
      aria-label="Finance calculator categories"
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        zIndex: 50,
        background: "#ffffff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* ── Trending strip ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "9px 20px",
        borderBottom: "0.5px solid #f3f4f6",
        background: "#ffffff",
        flexWrap: "wrap",
      }}>
        <span style={{
          fontSize: "11px",
          fontWeight: 600,
          color: "#9ca3af",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          flexShrink: 0,
        }}>
          Trending
        </span>
        {TRENDING.map((t) => (
          <TrendingPill key={t.slug} label={t.label} slug={t.slug} onClose={onClose} />
        ))}
      </div>

      {/* ── Two-panel body ── */}
      <div style={{ display: "flex", height: "400px" }}>

        {/* Left panel — category list */}
        <div
          role="listbox"
          aria-label="Calculator categories"
          style={{
            width: "200px",
            flexShrink: 0,
            background: "#FAFAFA",
            borderRight: "0.5px solid #e5e7eb",
            overflowY: "auto",
            padding: "8px 0",
          }}
        >
          {CATEGORIES.map((cat) => (
            <CategoryRow
              key={cat.id}
              id={cat.id}
              label={cat.label}
              count={cat.count}
              isActive={cat.id === activeId}
              onActivate={setActiveId}
            />
          ))}
        </div>

        {/* Right panel — tools */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#ffffff", minWidth: 0 }}>

          {/* Panel header */}
          <div style={{
            padding: "16px 20px 12px",
            borderBottom: "0.5px solid #f3f4f6",
            background: "#ffffff",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>
                {active.label}
              </span>
              <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                {active.count} tools
              </span>
            </div>
            <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#6b7280", lineHeight: "1.4" }}>
              {active.description}
            </p>
          </div>

          {/* Tools area — 3 vertical columns */}
          <div style={{ flex: 1, overflowY: "auto", padding: "6px 0", display: "flex" }}>
            {columns.map((col, ci) => (
              <div
                key={ci}
                style={{
                  flex: 1,
                  borderRight: ci < 2 ? "0.5px solid #f3f4f6" : "none",
                }}
              >
                {col.map((tool) => (
                  <ToolRow
                    key={tool.slug}
                    name={tool.name}
                    description={tool.description}
                    slug={tool.slug}
                    onClose={onClose}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer strip ── */}
      <div style={{
        borderTop: "0.5px solid #f3f4f6",
        padding: "10px 20px",
        background: "#FAFAFA",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontSize: "11px", color: "#9ca3af" }}>
          200 calculators across 12 categories — all free
        </span>
        <Link
          href={`/all-tools/?category=${active.slug}`}
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "11.5px",
            fontWeight: 600,
            color: "#1B4FD8",
            textDecoration: "none",
          }}
        >
          <IconLayoutGrid size={12} />
          View all {active.count} {active.label} tools &rarr;
        </Link>
      </div>
    </div>
  );
}
