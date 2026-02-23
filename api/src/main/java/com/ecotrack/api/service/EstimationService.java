package com.ecotrack.api.service;

import com.ecotrack.api.dto.EstimationRequest;
import com.ecotrack.api.model.Estimation;
import com.ecotrack.api.repository.EstimationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class EstimationService {

    private final EstimationRepository estimationRepository;

    public EstimationService(EstimationRepository estimationRepository) {
        this.estimationRepository = estimationRepository;
    }

    public Estimation calculateAndSave(EstimationRequest request){
        // Realizo el cálculo
        double factor = 0.5;
        Double result = request.getDistance() * factor;

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