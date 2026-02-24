package com.ecotrack.api.dto;
import com.ecotrack.api.model.enums.FuelType;
import com.ecotrack.api.model.enums.VehicleType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class EstimationRequest {
    @NotNull(message = "La distancia es obligatoria")
    @Positive(message = "La distancia debe ser mayor que cero")
    private Double distance;

    @NotNull(message = "El tipo de vehículo es obligatorio")
    private VehicleType vehicleType;

    @NotNull(message = "El tipo de combustible es obligatorio")
    private FuelType fuelType;

    @Positive(message = "El peso debe ser un valor positivo")
    private Double weight;
}
