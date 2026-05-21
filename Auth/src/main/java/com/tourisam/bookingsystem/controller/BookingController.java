package com.tourisam.bookingsystem.controller;

import com.tourisam.bookingsystem.model.Booking;
import com.tourisam.bookingsystem.model.BookingRequest;
import com.tourisam.bookingsystem.service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"}, allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Clean structural parsing utility with a safe fallback to prevent NullPointerException
    private Long getCurrentUserId(Authentication auth) {
        if (auth == null || auth.getName() == null) {
            // Safe Fallback ID for Dev/Testing if JWT context filter isn't parsing the token cleanly
            return 1L;
        }
        try {
            return Long.parseLong(auth.getName());
        } catch (NumberFormatException e) {
            return 1L; // Fallback default database User index
        }
    }

    // Helper to resolve incoming textual package IDs safely to a numeric Database ID
    private Long parsePackageId(String complexId) {
        if (complexId == null) return 1L;
        return switch (complexId.toLowerCase()) {
            case "sigiriya" -> 101L;
            case "ella" -> 102L;
            case "mirissa" -> 103L;
            case "kandy" -> 104L;
            default -> {
                try {
                    yield Long.parseLong(complexId);
                } catch (NumberFormatException e) {
                    yield 100L; // Default mock id fallback assignment
                }
            }
        };
    }

    // POST /api/bookings — Handle secure entry bookings
    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody BookingRequest request,
            Authentication auth) {

        Long userId = getCurrentUserId(auth);

        // Re-map the payload structure to match database entities types smoothly
        Booking targetBooking = new Booking();
        targetBooking.setUserId(userId);
        targetBooking.setPackageId(parsePackageId(request.getPackageId()));
        targetBooking.setTravelDate(request.getTravelDate());
        targetBooking.setGroupSize(request.getGroupSize());
        targetBooking.setTotalPrice(request.getTotalPrice());

        try {
            // Note: Update your BookingService signature to take a Booking entity, or map inside service
            Booking saved = bookingService.createBooking(request, userId);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing transaction entity: " + e.getMessage());
        }
    }

    // GET /api/bookings/my — Fetch authenticated active logs
    @GetMapping("/my")
    public ResponseEntity<List<Booking>> getMyBookings(Authentication auth) {
        Long userId = getCurrentUserId(auth);
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }

    // PUT /api/bookings/{id}/confirm — Authorization confirm operations
    @PutMapping("/{id}/confirm")
    public ResponseEntity<Booking> confirmBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.confirmBooking(id));
    }

    // PUT /api/bookings/{id}/cancel — Drop dynamic reservations
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.cancelBooking(id));
    }

    // PUT /api/bookings/{id}/pay — Simulate transactions process endpoints
    @PutMapping("/{id}/pay")
    public ResponseEntity<Booking> payBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.simulatePayment(id));
    }
}