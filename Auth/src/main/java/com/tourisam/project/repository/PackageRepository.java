package com.tourisam.project.repository;

import com.tourisam.project.model.TourPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PackageRepository extends JpaRepository<TourPackage, Long> {

    @Query("SELECT p FROM TourPackage p WHERE " +
            "(:destination IS NULL OR LOWER(p.destination) LIKE LOWER(CONCAT('%',:destination,'%'))) AND " +
            "(:category IS NULL OR LOWER(p.category) = LOWER(:category)) AND " +
            "p.basePrice >= :minPrice AND p.basePrice <= :maxPrice")
    List<TourPackage> findByFilters(
            @Param("destination") String destination,
            @Param("category")    String category,
            @Param("minPrice")    double minPrice,
            @Param("maxPrice")    double maxPrice
    );
}
