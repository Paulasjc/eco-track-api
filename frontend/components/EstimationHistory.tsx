'use client';

import { EstimationResponse } from '@/types/estimation';
import { getVehicleLabel, getFuelLabel, getVehicleBadgeClass } from '@/lib/constants';
import { FileStack } from 'lucide-react';

interface Props {
  history: EstimationResponse[];
}

export default function EstimationHistory({ history }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 transition-all duration-200 hover:shadow-md hover:border-slate-300">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6">
        Historial
      </h2>
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FileStack className="w-14 h-14 text-slate-300 mb-4 stroke-[1.25]" />
          <p className="text-sm font-medium text-slate-600 mb-1">Sin registros</p>
          <p className="text-sm text-slate-500 max-w-xs">
            Los trayectos calculados aparecerán aquí. Realiza tu primera estimación.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="min-w-full">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-slate-500 bg-slate-100">
                <th className="px-4 py-3 text-left font-medium rounded-tl-xl">Vehículo</th>
                <th className="px-4 py-3 text-left font-medium">Combustible</th>
                <th className="px-4 py-3 text-right font-medium">Distancia</th>
                <th className="px-4 py-3 text-right font-medium rounded-tr-xl">CO₂</th>
              </tr>
            </thead>
            <tbody>
              {[...history].reverse().map((h) => (
                <tr
                  key={h.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${getVehicleBadgeClass(h.vehicleType)}`}
                    >
                      {getVehicleLabel(h.vehicleType)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {getFuelLabel(h.fuelType)}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700 text-right tabular-nums">
                    {h.distance} km
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-emerald-600 tabular-nums">
                    {h.carbonResult.toFixed(2)} kg
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
