package com.tourisam.bookingsystem.repository;

import com.tourisam.bookingsystem.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Get all bookings for a specific user
    List<Booking> findByUserId(Long userId);

    // For Chamika's Admin Dashboard — total revenue
    @Query("SELECT SUM(b.totalPrice) FROM Booking b WHERE b.status = 'PAID'")
    Double getTotalRevenue();

    // For Chamika's Admin Dashboard — total booking count
    @Query("SELECT COUNT(b) FROM Booking b")
    Long getTotalBookings();
}
