'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { formatCompact } from '@/lib/format';

interface ResultsChartProps {
  type: string;
  data: unknown[];
  currency: string;
}

function AmortizationTooltip({ active, payload, label, currency }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string | number;
  currency: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-sm text-xs">
      <p className="font-semibold text-ink-primary mb-1.5">Year {label}</p>
      {payload.map((p) => (
        <p key={p.name} className="leading-relaxed" style={{ color: p.color }}>
          {p.name}: {formatCompact(p.value, currency)}
        </p>
      ))}
    </div>
  );
}

export function ResultsChart({ type, data, currency }: ResultsChartProps) {
  if (!data?.length) return null;

  if (type === 'amortization-stack') {
    const typedData = data as Array<{ year: number; principal: number; interest: number }>;
    return (
      <div>
        <h3 className="text-sm font-semibold text-ink-primary mb-4">Repayment breakdown by year</h3>
        <p className="sr-only">
          {typedData.map((d) =>
            `Year ${d.year}: Principal paid ${formatCompact(d.principal, currency)}, Interest paid ${formatCompact(d.interest, currency)}.`
          ).join(' ')}
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={typedData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
            <defs>
              <linearGradient id="principalFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1B4FD8" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#1B4FD8" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="interestFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B63E8" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#3B63E8" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `Y${v}`}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatCompact(v, currency)}
              width={58}
            />
            <Tooltip content={<AmortizationTooltip currency={currency} />} />
            <Legend
              formatter={(value) => (
                <span style={{ fontSize: 11, color: '#64748B' }}>{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="principal"
              name="Cumulative principal"
              stackId="1"
              stroke="#1B4FD8"
              strokeWidth={1.5}
              fill="url(#principalFill)"
            />
            <Area
              type="monotone"
              dataKey="interest"
              name="Cumulative interest"
              stackId="1"
              stroke="#3B63E8"
              strokeWidth={1.5}
              fill="url(#interestFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
}
