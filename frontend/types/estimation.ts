export interface EstimationRequest {
    distance: number,
    vehicleType: VehicleType | '',
    fuelType: FuelType | '',
    weight: number

}

export interface EstimationResponse {
    id: number,
    carbonResult: number, 
    createdAt: Date,
    distance: number,
    vehicleType: string,
    fuelType: string,

}

export type VehicleType = 
  | 'CAR_SMALL' | 'CAR_MEDIUM' | 'CAR_LARGE' | 'CAR_ELECTRIC'
  | 'TRUCK_LIGHT' | 'TRUCK_HEAVY' | 'MOTORBIKE' | 'BUS' 
  | 'VAN' | 'PLANE_SHORT_HAUL' | 'PLANE_LONG_HAUL';

  export type FuelType = 'GASOLINE' | 'DIESEL' | 'ELECTRIC' | 'JET_FUEL';