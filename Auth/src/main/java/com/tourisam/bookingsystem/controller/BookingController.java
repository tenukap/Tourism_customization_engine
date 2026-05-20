package com.tourisam.bookingsystem.controller;

import com.tourisam.bookingsystem.model.Booking;
import com.tourisam.bookingsystem.model.BookingRequest;
import com.tourisam.bookingsystem.service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
// Global cross-origin configuration targeting both standard local react dev ports
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"}, allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Extracted clean utility method parsing userId string maps from token principal properties
    private Long getCurrentUserId(Authentication auth) {
        return Long.parseLong(auth.getName());
    }

    // POST /api/bookings — Handle secure entry bookings
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Booking> createBooking(
            @RequestBody BookingRequest request,
            Authentication auth) {
        Long userId = getCurrentUserId(auth);
        return ResponseEntity.ok(bookingService.createBooking(request, userId));
    }

    // GET /api/bookings/my — Fetch authenticated active logs
    @GetMapping("/my")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Booking>> getMyBookings(Authentication auth) {
        Long userId = getCurrentUserId(auth);
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }

    // PUT /api/bookings/{id}/confirm — Authorization confirm operations
    @PutMapping("/{id}/confirm")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Booking> confirmBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.confirmBooking(id));
    }

    // PUT /api/bookings/{id}/cancel — Drop dynamic reservations
    @PutMapping("/{id}/cancel")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.cancelBooking(id));
    }

    // PUT /api/bookings/{id}/pay — Simulate transactions process endpoints
    @PutMapping("/{id}/pay")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Booking> payBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.simulatePayment(id));
    }
}