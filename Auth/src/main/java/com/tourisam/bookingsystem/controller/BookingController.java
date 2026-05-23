package com.tourisam.bookingsystem.controller;

import com.tourisam.bookingsystem.model.Booking;
import com.tourisam.bookingsystem.model.BookingRequest;
import com.tourisam.bookingsystem.model.BookingUpdateDTO;
import com.tourisam.bookingsystem.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"}, allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class BookingController {

    @Autowired
    private BookingService bookingService;

    private Long getCurrentUserId(Authentication auth) {
        if (auth == null || auth.getName() == null) return 1L;
        try { return Long.parseLong(auth.getName()); }
        catch (NumberFormatException e) { return 1L; }
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request, Authentication auth) {
        Long userId = getCurrentUserId(auth);
        try {
            Booking saved = bookingService.createBooking(request, userId);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBooking(@PathVariable Long id, @RequestBody BookingUpdateDTO dto) {
        try {
            Booking updated = bookingService.updateBooking(id, dto.getGuests(), dto.getNights(), dto.getDest());
            return ResponseEntity.ok(updated);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/my")
    public ResponseEntity<List<Booking>> getMyBookings(Authentication auth) {
        return ResponseEntity.ok(bookingService.getUserBookings(getCurrentUserId(auth)));
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<Booking> confirmBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.confirmBooking(id));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.cancelBooking(id));
    }

    @PutMapping("/{id}/pay")
    public ResponseEntity<Booking> payBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.simulatePayment(id));
    }
}