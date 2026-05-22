package com.tourisam.project.service;

import com.tourisam.project.model.TourPackage;
import com.tourisam.project.repository.PackageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PackageServiceImpl implements PackageService {

    private final PackageRepository packageRepository;

    public PackageServiceImpl(PackageRepository packageRepository) {
        this.packageRepository = packageRepository;
    }

    @Override
    public List<TourPackage> getAllPackages() {
        return packageRepository.findAll();
    }

    @Override
    public Optional<TourPackage> getPackageById(Long id) {
        return packageRepository.findById(id);
    }

    @Override
    public List<TourPackage> getFilteredPackages(String destination, String category,
                                                 Double minPrice, Double maxPrice) {
        double min = (minPrice != null) ? minPrice : 0.0;
        double max = (maxPrice != null) ? maxPrice : Double.MAX_VALUE;
        return packageRepository.findByFilters(destination, category, min, max);
    }

    @Override
    public TourPackage createPackage(TourPackage pkg) {
        return packageRepository.save(pkg);
    }

    @Override
    public TourPackage updatePackage(Long id, TourPackage updated) {
        TourPackage existing = packageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found: " + id));

        // Update inherited fields (from PackageBase via Lombok setters)
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setBasePrice(updated.getBasePrice());
        existing.setDurationDays(updated.getDurationDays());

        // Update TourPackage fields
        existing.setDestination(updated.getDestination());
        existing.setCategory(updated.getCategory());
        existing.setImageUrl(updated.getImageUrl());
        existing.setCreatedBy(updated.getCreatedBy());

        return packageRepository.save(existing);
    }

    @Override
    public void deletePackage(Long id) {
        if (!packageRepository.existsById(id)) {
            throw new RuntimeException("Package not found: " + id);
        }
        packageRepository.deleteById(id);
    }

    @Override
    public boolean packageExists(Long id) {
        return packageRepository.existsById(id);
    }
}
