package com.ecotrack.api.repository;

import com.ecotrack.api.model.Estimation;
import com.ecotrack.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstimationRepository extends JpaRepository<Estimation, Long> {
    // Al extender de JpaRepository, ya tenemos .save(), .findAll(), .findById()...
    List<Estimation> findByUser(User user);
}