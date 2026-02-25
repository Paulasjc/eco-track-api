package com.ecotrack.api.model;

import com.ecotrack.api.model.enums.FuelType;
import com.ecotrack.api.model.enums.VehicleType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Data
public class Estimation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private Double distance;
    @NotNull
    private VehicleType vehicleType;

    @NotNull
    private FuelType fuelType;
    private Double weight;
    private Double carbonResult;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
