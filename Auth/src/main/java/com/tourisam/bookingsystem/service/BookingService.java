package com.tourisam.bookingsystem.service;

import com.tourisam.bookingsystem.model.Booking;
import com.tourisam.bookingsystem.model.BookingRequest;
import com.tourisam.bookingsystem.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // Helper method to convert text-based package IDs to Long safely
    private Long convertPackageIdToLong(String textId) {
        if (textId == null) return 1L;
        return switch (textId.toLowerCase()) {
            case "sigiriya" -> 101L;
            case "ella" -> 102L;
            case "mirissa" -> 103L;
            case "kandy" -> 104L;
            default -> {
                try {
                    yield Long.parseLong(textId);
                } catch (NumberFormatException e) {
                    yield 100L; // Fallback mock identifier
                }
            }
        };
    }

    public Booking createBooking(BookingRequest request, Long userId) {
        Booking booking = new Booking();
        booking.setUserId(userId);

        // 🔥 FIXES THE INCOMPATIBLE TYPES ERROR: Convert String to Long safely
        booking.setPackageId(convertPackageIdToLong(request.getPackageId()));

        booking.setTravelDate(request.getTravelDate());
        booking.setGroupSize(request.getGroupSize());
        booking.setTotalPrice(request.getTotalPrice());
        booking.setStatus(Booking.BookingStatus.PENDING);

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public Booking confirmBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }

    public Booking cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        return bookingRepository.save(booking);
    }

    public Booking simulatePayment(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(Booking.BookingStatus.PAID);
        return bookingRepository.save(booking);
    }
}