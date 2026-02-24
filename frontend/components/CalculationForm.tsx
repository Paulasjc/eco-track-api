'use client'

import { EstimationRequest, EstimationResponse } from "@/types/estimation"
import { useState } from "react"

interface CalculationFormProps {
    onCalculateSucces: () => void; // Decimos que es una función que no devuelve nada
}

const VEHICLE_OPTIONS = [
    { value: 'CAR_SMALL', label: 'Coche Pequeño' },
    { value: 'CAR_MEDIUM', label: 'Coche Mediano' },
    { value: 'CAR_LARGE', label: 'Coche Grande' },
    { value: 'CAR_ELECTRIC', label: 'Coche Eléctrico' },
    { value: 'TRUCK_LIGHT', label: 'Camión Ligero' },
    { value: 'TRUCK_HEAVY', label: 'Camión Pesado' },
    { value: 'VAN', label: 'Furgoneta' },
    { value: 'MOTORBIKE', label: 'Motocicleta' },
    { value: 'BUS', label: 'Autobús' },
    { value: 'PLANE_SHORT_HAUL', label: 'Avión (Vuelo Corto)' },
    { value: 'PLANE_LONG_HAUL', label: 'Avión (Vuelo Largo)' },
];

const FUEL_OPTIONS = [
    { value: 'GASOLINE', label: 'Gasolina' },
    { value: 'DIESEL', label: 'Diésel' },
    { value: 'ELECTRIC', label: 'Electricidad' },
    { value: 'JET_FUEL', label: 'Queroseno' },
];

export default function CalculationForm(props: CalculationFormProps) {

    // Defino el estado para los campos del formulario

    const [formData, setFormData] = useState<EstimationRequest>({
        distance: '' as any,
        vehicleType: '',
        fuelType: '',
        weight: '' as any,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<EstimationResponse | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {


        const { name, value } = e.target;
        setFormData({
            ...formData,
            // Si el valor está vacío, lo dejamos vacío para que el usuario pueda borrar.
            // Si tiene algo y es un campo numérico, lo convertimos a número.
            [name]: value === ""
                ? ""
                : (name === "distance" || name === "weight" ? Number(value) : value)
        });


    };

    // Definir el estado apra la respuesta que vendrá e la API
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validación simple antes de enviar
        if (!formData.vehicleType || !formData.fuelType || !formData.distance) {
            setError("Por favor, rellena todos los campos obligatorios.");
            return;
        }
        setIsLoading(true); // 1. Empezamos a cargar
        setError(null);

        try {
            const response = await fetch('http://localhost:8080/api/v1/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });


            if (!response.ok) {
                throw new Error("Fallo en el cálculo");
            }




            const data = await response.json();
            setResult(data); // 2. Guardamos el éxito
            props.onCalculateSucces();
        } catch (error) {
            setError("No se pudo conectar con el servidor");
        } finally {
            setIsLoading(false); // 3. Pase lo que pase, dejamos de cargar
        }
    };
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Calculadora de CO2</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* INPUT PARA DISTANCIA */}
                <div>
                    <label className="block text-sm font-medium">Distancia (km)</label>
                    <input
                        type="number"
                        name="distance" // IMPORTANTE: que coincida con la clave del objeto
                        value={formData.distance}
                        onChange={handleChange} // Aquí es donde usas la función que te sugerí antes
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* SELECT PARA VEHÍCULO */}
                {/* Intenta añadir tú el <select> para vehicleType y fuelType */}
                <div>
                    <select
                        name="vehicleType" // Clave en el objeto
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Selecciona vehículo</option>
                        {VEHICLE_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Selecciona combustible</option>
                        {FUEL_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Peso</label>
                    <input
                        type="number"
                        name="weight" // IMPORTANTE: que coincida con la clave del objeto
                        value={formData.weight}
                        onChange={handleChange} // Aquí es donde usas la función que te sugerí antes
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                    {isLoading ? 'Calculando...' : 'Calcular Huella'}
                </button>
            </form>

            {/* MUESTRA EL RESULTADO SI EXISTE */}
            {result && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
                    <p className="text-green-800">Resultado: {result.carbonResult} kg de CO2</p>
                </div>
            )}
        </div>
    );





}