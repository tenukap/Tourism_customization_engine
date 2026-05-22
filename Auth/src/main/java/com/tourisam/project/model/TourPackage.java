package com.tourisam.project.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Slf4j
@Entity
@Table(name = "tour_packages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TourPackage extends PackageBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Destination is required")
    @Column(nullable = false)
    private String destination;

    @NotBlank(message = "Category is required")
    @Column(nullable = false)
    private String category;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    //overrides abstract method from PackageBase(po)
    @Override
    public String getPackageType() {
        if (category == null) return "Standard Package";
        return switch (category.toLowerCase()) {
            case "adventure" -> "Adventure Package";
            case "luxury"    -> "Luxury Package";
            case "beach"     -> "Beach Package";
            case "cultural"  -> "Cultural Package";
            case "wildlife"  -> "Wildlife Package";
            default          -> "Standard Package";
        };
    }

    //standard package(po)
    @Override
    public double calculateFinalPrice() {
        return getBasePrice();
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PostPersist
    protected void afterCreate() {
        log.info("Tour Package created with ID: " + id);
    }
}
