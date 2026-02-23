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

    public Estimation calculateAndSave(EstimationRequest request){

        EmissionFactor factorEntity = factorRepository
                .findByVehicleTypeAndFuelType(request.getVehicleType(), request.getFuelType())
                .orElseThrow(() -> new RuntimeException("Combinación de vehículo y combustible no soportada"));

        Double result = request.getDistance() * factorEntity.getFactor();

        // Crear la entidad para guardarla.
        Estimation estimation = new Estimation();
        estimation.setDistance(request.getDistance());
        estimation.setVehicleType(request.getVehicleType());
        estimation.setFuelType(request.getFuelType());
        estimation.setCarbonResult(result);
        estimation.setCreatedAt(LocalTime.from(LocalDateTime.now()));

        // Guardarlo en l abase de datos
        return estimationRepository.save(estimation);
    }


    public List<Estimation> getAll() {
        return estimationRepository.findAll();
    }
}