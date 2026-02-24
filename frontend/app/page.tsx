'use client'
import CalculationForm from "@/components/CalculationForm";
import EstimationHistory from "@/components/EstimationHistory";
import { EstimationResponse } from "@/types/estimation";
import { useEffect, useState } from "react";

export default function Home() {
  const [history, setHistory] = useState<EstimationResponse[]>([]);

  // Creamos la función fuera para que sea reutilizable
  const fetchHistory = async () => {
    const response = await fetch('http://localhost:8080/api/v1/calculate');
    const data = await response.json();
    setHistory(data);
  };

  useEffect(() => {
    fetchHistory(); // Se ejecuta al cargar
  }, []);
  
  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* CABECERA */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            Eco<span className="text-emerald-600">Track</span>
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Visualiza y reduce tu huella de carbono logística</p>
        </header>
  
        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: Formulario (ocupa 1 de 3 partes) */}
          <div className="lg:col-span-1">
            <div className="sticky top-10">
              <CalculationForm onCalculateSucces={fetchHistory} />
            </div>
          </div>
  
          {/* COLUMNA DERECHA: Historial (ocupa 2 de 3 partes) */}
          <div className="lg:col-span-2">
            {/* Aquí podrías añadir un pequeño resumen de "Total CO2" antes de la tabla */}
            <EstimationHistory history={history} />
          </div>
  
        </div>
      </div>
    </main>
  );
}
