package com.tourisam.project.repository;

import com.tourisam.project.model.TourPackage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourPackageRepository extends JpaRepository<TourPackage, Long> {
}