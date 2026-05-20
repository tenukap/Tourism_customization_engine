package com.example.systemoverview.controller;

import com.example.systemoverview.model.SystemOverview;
import com.example.systemoverview.service.SystemOverviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/system")
public class SystemOverviewController {

    private final SystemOverviewService systemOverviewService;

    public SystemOverviewController(SystemOverviewService systemOverviewService) {
        this.systemOverviewService = systemOverviewService;
    }

    @GetMapping("/overview")
    public ResponseEntity<SystemOverview> getSystemOverview() {
        return ResponseEntity.ok(systemOverviewService.getSystemOverview());
    }

    @GetMapping("/users")
    public ResponseEntity<Integer> getTotalUsers() {
        return ResponseEntity.ok(systemOverviewService.getSystemOverview().getTotalUsers());
    }

    @GetMapping("/revenue")
    public ResponseEntity<String> getTotalRevenue() {
        return ResponseEntity.ok(systemOverviewService.getSystemOverview().getTotalRevenue());
    }

    @GetMapping("/reviews")
    public ResponseEntity<Integer> getActiveReviews() {
        return ResponseEntity.ok(systemOverviewService.getSystemOverview().getActiveReviews());
    }
}