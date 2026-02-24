package com.ecotrack.api.model;

import com.ecotrack.api.model.enums.FuelType;
import com.ecotrack.api.model.enums.VehicleType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class EmissionFactor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING) // Importante: guarda el texto (CAR_SMALL) y no el número (0)
    private VehicleType vehicleType;
    @Enumerated(EnumType.STRING)
    private FuelType fuelType;
    private Double factor; // kg de CO2 por km

}
