package com.tourisam.bookingsystem.service;

import com.tourisam.bookingsystem.model.Booking;
import com.tourisam.bookingsystem.model.Booking.BookingStatus;
import com.tourisam.bookingsystem.model.BookingRequest;
import com.tourisam.bookingsystem.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // 1. Create a new booking
    public Booking createBooking(BookingRequest request, Long userId) {
        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setPackageId(request.getPackageId() != null ? request.getPackageId() : 1L); // fake until Tharusha merges
        booking.setTravelDate(request.getTravelDate());
        booking.setGroupSize(request.getGroupSize());
        booking.setTotalPrice(request.getTotalPrice());
        booking.setStatus(BookingStatus.PENDING);
        return bookingRepository.save(booking);
    }

    // 2. Get all bookings for a user
    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    // 3. Confirm a booking
    public Booking confirmBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + id));
        booking.setStatus(BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }

    // 4. Cancel a booking
    public Booking cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + id));
        booking.setStatus(BookingStatus.CANCELLED);
        return bookingRepository.save(booking);
    }

    // 5. Simulate payment (marks as PAID)
    public Booking simulatePayment(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + id));
        booking.setStatus(BookingStatus.PAID);
        return bookingRepository.save(booking);
    }
}
