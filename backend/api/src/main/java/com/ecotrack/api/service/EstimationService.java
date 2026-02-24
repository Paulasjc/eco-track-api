package com.ecotrack.api.service;

import com.ecotrack.api.dto.EstimationRequest;
import com.ecotrack.api.model.EmissionFactor;
import com.ecotrack.api.model.Estimation;
import com.ecotrack.api.repository.EmissionFactorRepository;
import com.ecotrack.api.repository.EstimationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class EstimationService {

    private final EstimationRepository estimationRepository;
    private final EmissionFactorRepository factorRepository;

    public EstimationService(EstimationRepository estimationRepository, EmissionFactorRepository factorRepository) {
        this.estimationRepository = estimationRepository;
        this.factorRepository = factorRepository;
    }

    public Estimation calculateAndSave(EstimationRequest request) {
        // 1. Buscamos el factor base
        EmissionFactor factorEntity = factorRepository
                .findByVehicleTypeAndFuelType(request.getVehicleType(), request.getFuelType())
                .orElseThrow(() -> new RuntimeException("Combinación no encontrada"));

        // 2. Llamamos al método que contiene la "ciencia"
        Double result = calculateCarbonEmission(request, factorEntity.getFactor());

        // 3. Mapeamos a la entidad
        Estimation estimation = new Estimation();
        estimation.setDistance(request.getDistance());
        estimation.setVehicleType(request.getVehicleType());
        estimation.setFuelType(request.getFuelType());
        estimation.setCarbonResult(result);
        estimation.setWeight(request.getWeight()); // ¡No olvides el peso!
        estimation.setCreatedAt(LocalDateTime.now()); // Mejor usar LocalDateTime para auditoría completa

        return estimationRepository.save(estimation);
    }

    // ESTE ES EL CORAZÓN DEL SERVICIO (Separado y Robusto)
    private Double calculateCarbonEmission(EstimationRequest request, Double baseFactor) {
        double weight = (request.getWeight() != null) ? request.getWeight() : 0.0;
        double weightImpact = 0.0;

        // Aquí pegamos el switch que vimos antes para la lógica de peso
        switch (request.getVehicleType()) {
            case TRUCK_LIGHT:
            case TRUCK_HEAVY:
            case VAN:
                weightImpact = (weight / 1000) * 0.02;
                break;
            case CAR_SMALL:
            case CAR_MEDIUM:
            case CAR_LARGE:
                weightImpact = (weight / 100) * 0.005;
                break;
            default:
                weightImpact = 0.0;
        }

        return (baseFactor + weightImpact) * request.getDistance();
    }

    public List<Estimation> getAll() {
        return estimationRepository.findAll();
    }
}