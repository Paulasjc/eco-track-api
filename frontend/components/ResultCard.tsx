'use client';

import { EstimationResponse } from '@/types/estimation';
import { BarChart3 } from 'lucide-react';

interface ResultCardProps {
  result: EstimationResponse | null;
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 transition-all duration-200 hover:shadow-md hover:border-slate-300">
      {result ? (
        <div>
          <p className="text-sm text-slate-500 mb-2">Emisión estimada</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold tracking-tight text-emerald-600 tabular-nums">
              {result.carbonResult.toFixed(2)}
            </span>
            <span className="text-lg font-medium text-slate-700">kg CO₂</span>
          </div>
          <p className="text-sm text-slate-500 mt-3">
            Dentro del rango estimado para este tipo de transporte.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <BarChart3 className="w-10 h-10 text-slate-300 mb-3 stroke-[1.25]" />
          <p className="text-sm text-slate-500">
            Ejecuta un cálculo para ver la emisión estimada.
          </p>
        </div>
      )}
    </div>
  );
}
