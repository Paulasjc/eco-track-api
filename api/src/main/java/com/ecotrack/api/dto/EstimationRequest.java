package com.ecotrack.api.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class EstimationRequest {
    @NotNull(message = "La distancia es obligatoria")
    @Positive(message = "La distancia debe ser mayor que cero")
    private Double distance;

    @NotBlank(message = "El tipo de vehículo es obligatorio")
    private String vehicleType;

    @NotBlank(message = "El tipo de combustible es obligatorio")
    private String fuelType;

    @Positive(message = "El peso debe ser un valor positivo")
    private Double weight;
}
