'use client';

import { EstimationResponse } from '@/types/estimation';
import { BarChart3, Leaf } from 'lucide-react';

interface ResultCardProps {
  result: EstimationResponse | null;
}

const CO2_PER_TREE_KG = 20;

export default function ResultCard({ result }: ResultCardProps) {
  const treesEquivalent = result ? result.carbonResult / CO2_PER_TREE_KG : 0;

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
          <p className="mt-4 text-sm text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
            ¡Esto equivale a aproximadamente{' '}
            <span className="font-semibold">
              {treesEquivalent.toFixed(1)} {treesEquivalent.toFixed(1) === '1.0' ? 'árbol plantado' : 'árboles plantados'}
            </span>
            !
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-3 flex items-center justify-center rounded-full bg-emerald-50 p-3 border border-emerald-100">
            <Leaf className="w-8 h-8 text-emerald-500 stroke-[1.4]" />
          </div>
          <p className="text-sm font-medium text-slate-800 mb-1">
            Aún no hay resultados
          </p>
          <p className="text-sm text-slate-500 max-w-xs">
            Calcula la huella de tu trayecto y descubre cómo pequeños cambios pueden generar un gran impacto positivo.
          </p>
        </div>
      )}
    </div>
  );
}
