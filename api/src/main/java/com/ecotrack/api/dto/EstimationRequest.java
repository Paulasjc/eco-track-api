package com.ecotrack.api.dto;
import lombok.Data;
@Data
public class EstimationRequest {
    private Double distance;
    private String vehicleType;
    private String fuelType;
    private Double weight;
}
