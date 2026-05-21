package com.tourisam.project.service;

import com.tourisam.project.model.TourPackage;

import java.util.List;
import java.util.Optional;

public interface PackageService {
    List<TourPackage>    getAllPackages();
    Optional<TourPackage> getPackageById(Long id);
    List<TourPackage>    getFilteredPackages(String destination, String category, Double minPrice, Double maxPrice);
    TourPackage          createPackage(TourPackage pkg);
    TourPackage          updatePackage(Long id, TourPackage pkg);
    void                 deletePackage(Long id);
    boolean              packageExists(Long id);
}
