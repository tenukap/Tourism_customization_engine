package com.example.starrating.controller;

import com.example.starrating.model.StarRating;
import com.example.starrating.service.StarRatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stars")
public class StarRatingController {

    private final StarRatingService starRatingService;

    public StarRatingController(StarRatingService starRatingService) {
        this.starRatingService = starRatingService;
    }

    @GetMapping
    public ResponseEntity<StarRating> getStarRating(@RequestParam int rating) {
        StarRating starRating = starRatingService.getStarRating(rating);
        return ResponseEntity.ok(starRating);
    }
}