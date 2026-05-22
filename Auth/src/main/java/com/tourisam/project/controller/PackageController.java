package com.tourisam.project.controller;

import com.tourisam.project.model.TourPackage;
import com.tourisam.project.service.PackageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PackageController {

    private final PackageService packageService;

    public PackageController(PackageService packageService) {
        this.packageService = packageService;
    }

    // GET all packages
    @GetMapping
    public ResponseEntity<List<TourPackage>> getAllPackages() {
        return ResponseEntity.ok(packageService.getAllPackages());
    }

    // GET by ID
    @GetMapping("/{id}")
    public ResponseEntity<TourPackage> getById(@PathVariable Long id) {
        return packageService.getPackageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET with filters — destination, category, price range
    @GetMapping("/filter")
    public ResponseEntity<List<TourPackage>> getFiltered(
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        return ResponseEntity.ok(
                packageService.getFilteredPackages(destination, category, minPrice, maxPrice));
    }

    // POST create
    @PostMapping
    public ResponseEntity<TourPackage> create(@RequestBody TourPackage pkg) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(packageService.createPackage(pkg));
    }

    // PUT update
    @PutMapping("/{id}")
    public ResponseEntity<TourPackage> update(@PathVariable Long id,
                                              @RequestBody TourPackage pkg) {
        try {
            return ResponseEntity.ok(packageService.updatePackage(id, pkg));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            packageService.deletePackage(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/summary")
    public ResponseEntity<String> getSummary(@PathVariable Long id) {
        return packageService.getPackageById(id)
                .map(p -> ResponseEntity.ok(p.getSummary()))
                .orElse(ResponseEntity.notFound().build());
    }
}
