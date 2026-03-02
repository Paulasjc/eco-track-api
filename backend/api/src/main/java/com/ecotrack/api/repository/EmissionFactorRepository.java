package com.ecotrack.api.repository;

import com.ecotrack.api.model.EmissionFactor;
import com.ecotrack.api.model.enums.FuelType;
import com.ecotrack.api.model.enums.VehicleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmissionFactorRepository extends JpaRepository<EmissionFactor, Long > {
    Optional<EmissionFactor> findByVehicleTypeAndFuelType(VehicleType vehicleType, FuelType fuelType);
}
