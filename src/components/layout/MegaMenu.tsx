"use client";

import Link from "next/link";
import { useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { CATEGORIES } from "@/data/categories";
import { getByCategory } from "@/data/calculators";

const TRENDING = [
  { label: "Old vs New Tax Regime", slug: "new-vs-old-tax-regime-calculator" },
  { label: "FIRE Calculator",       slug: "fire-calculator" },
  { label: "SIP Step-Up",           slug: "step-up-sip-calculator" },
  { label: "Home Loan EMI",         slug: "home-loan-emi-calculator" },
  { label: "Currency Converter",    slug: "currency-converter" },
];

function TrendingPill({
  label,
  slug,
  onClose,
}: {
  label: string;
  slug: string;
  onClose: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/calculators/${slug}/`}
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        border: `0.5px solid ${hovered ? "#1B4FD8" : "#e5e7eb"}`,
        borderRadius: "20px",
        padding: "3px 10px",
        fontSize: "11px",
        color: hovered ? "#1B4FD8" : "#374151",
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "border-color 0.1s, color 0.1s",
      }}
    >
      {label}
    </Link>
  );
}

function CategoryRow({
  id,
  label,
  count,
  isActive,
  onActivate,
}: {
  id: string;
  label: string;
  count: number;
  isActive: boolean;
  onActivate: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const active = isActive || hovered;

  return (
    <button
      role="option"
      aria-selected={isActive}
      onMouseEnter={() => { setHovered(true); onActivate(id); }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onActivate(id)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 14px",
        background: active ? "#EEF2FF" : "transparent",
        cursor: "pointer",
        textAlign: "left" as const,
        outline: "none",
        border: "none",
        borderLeft: `2px solid ${active ? "#1B4FD8" : "transparent"}`,
      }}
    >
      <span
        style={{
          fontSize: "12px",
          color: active ? "#1B4FD8" : "#374151",
          fontWeight: active ? 500 : 400,
          flex: 1,
          textAlign: "left",
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: "10px", color: "#9ca3af" }}>{count}</span>
      <IconChevronRight
        size={10}
        style={{ color: active ? "#1B4FD8" : "#d1d5db", flexShrink: 0 }}
      />
    </button>
  );
}

function ToolCard({
  name,
  slug,
  onClose,
}: {
  name: string;
  slug: string;
  onClose: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/calculators/${slug}/`}
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#EEF2FF" : "#ffffff",
        border: `0.5px solid ${hovered ? "#1B4FD8" : "#e5e7eb"}`,
        borderRadius: "6px",
        padding: "7px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        textDecoration: "none",
        transition: "background 0.1s, border-color 0.1s",
        gap: "6px",
      }}
    >
      <span
        style={{
          fontSize: "11.5px",
          color: hovered ? "#1B4FD8" : "#1f2937",
          lineHeight: "1.3",
        }}
      >
        {name}
      </span>
      <IconChevronRight
        size={10}
        style={{ color: hovered ? "#1B4FD8" : "#d1d5db", flexShrink: 0 }}
      />
    </Link>
  );
}

export default function MegaMenu({ onClose }: { onClose: () => void }) {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];
  const tools = getByCategory(activeId);

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
        boxShadow: "0 4px 16px -2px rgba(0,0,0,0.08)",
      }}
    >
      {/* Trending strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "7px 14px",
          borderBottom: "0.5px solid #e5e7eb",
          background: "#ffffff",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "11px", color: "#9ca3af", flexShrink: 0 }}>
          Trending:
        </span>
        {TRENDING.map((t) => (
          <TrendingPill key={t.slug} label={t.label} slug={t.slug} onClose={onClose} />
        ))}
      </div>

      {/* Two-panel body */}
      <div style={{ display: "flex", height: "360px" }}>
        {/* Left panel — category list */}
        <div
          role="listbox"
          aria-label="Calculator categories"
          style={{
            width: "185px",
            flexShrink: 0,
            borderRight: "0.5px solid #e5e7eb",
            background: "#ffffff",
            overflowY: "auto",
            padding: "6px 0",
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

        {/* Right panel — tools for active category */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#FAFAFA",
            minWidth: 0,
          }}
        >
          {/* Panel header */}
          <div
            style={{
              padding: "12px 16px 8px",
              borderBottom: "0.5px solid #e5e7eb",
              background: "#ffffff",
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 500, color: "#111827" }}>
              {active.label}
            </span>
            <span style={{ fontSize: "11px", color: "#9ca3af" }}>
              {active.count} tools
            </span>
          </div>

          {/* Tools grid */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "10px 14px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "4px",
              }}
            >
              {tools.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  name={tool.name}
                  slug={tool.slug}
                  onClose={onClose}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div
        style={{
          padding: "8px 16px",
          borderTop: "0.5px solid #e5e7eb",
          background: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "11px", color: "#9ca3af" }}>
          204 calculators across 12 categories
        </span>
        <Link
          href={`/all-tools/?category=${active.slug}`}
          onClick={onClose}
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "#1B4FD8",
            textDecoration: "none",
          }}
        >
          View all {active.count} {active.label} tools &rarr;
        </Link>
      </div>
    </div>
  );
}
