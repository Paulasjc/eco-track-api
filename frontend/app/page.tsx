'use client';

import CalculationForm from '@/components/CalculationForm';
import EstimationHistory from '@/components/EstimationHistory';
import ResultCard from '@/components/ResultCard';
import KpiCards from '@/components/KpiCards';
import Navbar from '@/components/Navbar';
import { EstimationResponse } from '@/types/estimation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [history, setHistory] = useState<EstimationResponse[]>([]);
  const [lastResult, setLastResult] = useState<EstimationResponse | null>(null);

  // Cargar historial desde localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem('estimationHistory');
      if (stored) {
        const parsed = JSON.parse(stored) as EstimationResponse[];
        setHistory(parsed);
      }
    } catch {
      setHistory([]);
    }
  }, []);

  // Persistir historial en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem('estimationHistory', JSON.stringify(history));
    } catch {
      // si localStorage falla, simplemente no persistimos
    }
  }, [history]);

  const handleCalculateSuccess = (result: EstimationResponse) => {
    setLastResult(result);
    setHistory((prev) => [result, ...prev]);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          
          <KpiCards history={history} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <CalculationForm onCalculateSuccess={handleCalculateSuccess} />
            </div>
            <div className="space-y-10">
              <ResultCard result={lastResult} />
              <EstimationHistory history={history} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
