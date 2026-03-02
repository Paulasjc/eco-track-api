'use client';

import { EstimationResponse } from '@/types/estimation';
import { useMemo } from 'react';
import { Flame, TrendingDown, Route } from 'lucide-react';

interface KpiCardsProps {
  history: EstimationResponse[];
}

export default function KpiCards({ history }: KpiCardsProps) {
  const kpis = useMemo(() => {
    const totalCo2 = history.reduce((acc, h) => acc + h.carbonResult, 0);
    const totalKm = history.reduce((acc, h) => acc + h.distance, 0);
    const efficiency = totalKm > 0 ? totalCo2 / totalKm : 0;
    return {
      totalCo2,
      efficiency,
      totalTrips: history.length,
    };
  }, [history]);

  const cardBase =
    'bg-white rounded-2xl border border-slate-200 shadow-sm p-6 transition-all duration-200 hover:shadow-md hover:border-slate-200/80';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-10">
      <div className={cardBase}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-600 transition-colors">
            <Flame className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">
            Total CO₂ emitido
          </span>
        </div>
        <p className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
          {kpis.totalCo2.toFixed(2)} <span className="text-lg font-semibold text-slate-600">kg</span>
        </p>
      </div>
      <div className={cardBase}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-600 transition-colors">
            <TrendingDown className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">
            Eficiencia media
          </span>
        </div>
        <p className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
          {kpis.efficiency > 0 ? `${kpis.efficiency.toFixed(2)}` : '—'}{' '}
          <span className="text-lg font-semibold text-slate-600">kg/km</span>
        </p>
      </div>
      <div className={cardBase}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-600 transition-colors">
            <Route className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">
            Total trayectos
          </span>
        </div>
        <p className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
          {kpis.totalTrips}
        </p>
      </div>
    </div>
  );
}
