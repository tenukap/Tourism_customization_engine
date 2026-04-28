package com.tourisam.project.service;

import com.tourisam.project.model.TourPackage;
import com.tourisam.project.repository.TourPackageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TourPackageService {

    private final TourPackageRepository repository;

    public TourPackageService(TourPackageRepository repository) {
        this.repository = repository;
    }

    public TourPackage addPackage(TourPackage tourPackage) {
        return repository.save(tourPackage);
    }

    public List<TourPackage> getAllPackages() {
        return repository.findAll();
    }

    public TourPackage getPackageById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deletePackage(Long id) {
        repository.deleteById(id);
    }
}