export const VEHICLE_LABELS: Record<string, string> = {
  CAR_SMALL: 'Coche pequeño',
  CAR_MEDIUM: 'Coche mediano',
  CAR_LARGE: 'Coche grande',
  CAR_ELECTRIC: 'Coche eléctrico',
  TRUCK_LIGHT: 'Camión ligero',
  TRUCK_HEAVY: 'Camión pesado',
  VAN: 'Furgoneta',
  MOTORBIKE: 'Motocicleta',
  BUS: 'Autobús',
  PLANE_SHORT_HAUL: 'Avión (corto)',
  PLANE_LONG_HAUL: 'Avión (largo)',
};

export const FUEL_LABELS: Record<string, string> = {
  GASOLINE: 'Gasolina',
  DIESEL: 'Diésel',
  ELECTRIC: 'Electricidad',
  JET_FUEL: 'Queroseno',
};

export function getVehicleLabel(value: string): string {
  return VEHICLE_LABELS[value] ?? value;
}

export function getFuelLabel(value: string): string {
  return FUEL_LABELS[value] ?? value;
}

/** Badge background + text color by vehicle type for table badges */
export function getVehicleBadgeClass(vehicleType: string): string {
  if (vehicleType.startsWith('CAR_')) return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  if (vehicleType.startsWith('TRUCK_')) return 'bg-amber-50 text-amber-700 border border-amber-200';
  if (vehicleType === 'VAN' || vehicleType === 'BUS') return 'bg-sky-50 text-sky-700 border border-sky-200';
  if (vehicleType.startsWith('PLANE_')) return 'bg-violet-50 text-violet-700 border border-violet-200';
  if (vehicleType === 'MOTORBIKE') return 'bg-slate-100 text-slate-700 border border-slate-200';
  return 'bg-slate-100 text-slate-600 border border-slate-200';
}
