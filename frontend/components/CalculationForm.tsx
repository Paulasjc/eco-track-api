'use client';

import { EstimationRequest, EstimationResponse } from '@/types/estimation';
import { VEHICLE_LABELS, FUEL_LABELS } from '@/lib/constants';
import { useState } from 'react';

const VEHICLE_OPTIONS = Object.entries(VEHICLE_LABELS).map(([value, label]) => ({ value, label }));
const FUEL_OPTIONS = Object.entries(FUEL_LABELS).map(([value, label]) => ({ value, label }));

interface CalculationFormProps {
  onCalculateSuccess: (result: EstimationResponse) => void;
}

const inputClass =
  'h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition';

export default function CalculationForm({ onCalculateSuccess }: CalculationFormProps) {
  const [formData, setFormData] = useState<{
    distance: number | '';
    vehicleType: string;
    fuelType: string;
    weight: number | '';
  }>({
    distance: '',
    vehicleType: '',
    fuelType: '',
    weight: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        value === ''
          ? ''
          : name === 'distance' || name === 'weight'
            ? Number(value)
            : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.vehicleType || !formData.fuelType || !formData.distance) {
      setError('Por favor, rellena todos los campos obligatorios.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const basePayload: Omit<EstimationRequest, 'weight'> = {
        distance: Number(formData.distance),
        vehicleType: formData.vehicleType as EstimationRequest['vehicleType'],
        fuelType: formData.fuelType as EstimationRequest['fuelType'],
      };

      const payload: EstimationRequest =
        formData.weight === ''
          ? basePayload
          : { ...basePayload, weight: Number(formData.weight) };
      const response = await fetch('http://localhost:8080/api/v1/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Fallo en el cálculo');
      const data = await response.json();
      onCalculateSuccess(data);
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 transition-all duration-200 hover:shadow-md hover:border-slate-300">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6">
        Calculadora
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-500 mb-1">
            Distancia (km)
          </label>
          <input
            type="number"
            name="distance"
            value={formData.distance === '' ? '' : formData.distance}
            onChange={handleChange}
            className={inputClass}
            min={0}
            step={0.01}
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-500 mb-1">
            Vehículo
          </label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Selecciona vehículo</option>
            {VEHICLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-500 mb-1">
            Combustible
          </label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Selecciona combustible</option>
            {FUEL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-500 mb-1">
            Peso (kg, opcional)
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight === '' ? '' : formData.weight}
            onChange={handleChange}
            className={inputClass}
            min={0}
            step={0.01}
          />
        </div>
        {error && (
          <p className="text-sm text-slate-600" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Calculando...
            </>
          ) : (
            'Calcular emisión'
          )}
        </button>
      </form>
    </div>
  );
}
