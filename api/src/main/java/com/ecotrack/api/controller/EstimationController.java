package com.ecotrack.api.controller;
import com.ecotrack.api.dto.EstimationRequest;
import com.ecotrack.api.model.Estimation;
import com.ecotrack.api.service.EstimationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Indica que va a recibir llamadas de internet.
@RequestMapping("api/v1/calculate") // direc api.
public class EstimationController {

    private final EstimationService estimationService;
    // Inyeccion por constructor

    public EstimationController(EstimationService estimationService){
        this.estimationService = estimationService;
    }

    @PostMapping // Método post
    public Estimation calculate(@Valid  @RequestBody EstimationRequest request){
        return estimationService.calculateAndSave(request);
    }

    // Método para poder ver el historial
    @GetMapping
    public List<Estimation> getAllEstimation (){
        return estimationService.getAll();
    }
}
