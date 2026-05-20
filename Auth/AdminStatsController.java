package com.example.adminstats.controller;

import com.example.adminstats.model.AdminStats;
import com.example.adminstats.service.AdminStatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/stats")
public class AdminStatsController {

    private final AdminStatsService adminStatsService;

    public AdminStatsController(AdminStatsService adminStatsService) {
        this.adminStatsService = adminStatsService;
    }

    @GetMapping
    public ResponseEntity<AdminStats> getDashboardStats() {
        return ResponseEntity.ok(adminStatsService.getDashboardStats());
    }

    @GetMapping("/users")
    public ResponseEntity<Long> getTotalUsers() {
        return ResponseEntity.ok(adminStatsService.getTotalUsers());
    }

    @GetMapping("/revenue")
    public ResponseEntity<Double> getTotalRevenue() {
        return ResponseEntity.ok(adminStatsService.getTotalRevenue());
    }

    @GetMapping("/pending-reviews")
    public ResponseEntity<Long> getTotalPendingReviews() {
        return ResponseEntity.ok(adminStatsService.getTotalPendingReviews());
    }
}