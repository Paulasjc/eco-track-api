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

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/calculate');
      const data = await response.json();
      setHistory(data);
    } catch {
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleCalculateSuccess = (result: EstimationResponse) => {
    setLastResult(result);
    fetchHistory();
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
