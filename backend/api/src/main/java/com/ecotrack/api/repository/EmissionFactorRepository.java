package com.ecotrack.api.repository;

import com.ecotrack.api.model.EmissionFactor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmissionFactorRepository extends JpaRepository<EmissionFactor, Long > {
    Optional<EmissionFactor> findByVehicleTypeAndFuelType(String vehicleType, String fueltype);
}
