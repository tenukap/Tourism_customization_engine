package com.tourisam.bookingsystem.model;

import java.time.LocalDate;

// DTO — exactly what the React form sends to the backend
public class BookingRequest {

    private String packageId; // Changed to String to capture frontend selection safely
    private LocalDate travelDate;
    private int groupSize;
    private double totalPrice;

    // Getters & Setters
    public String getPackageId() { return packageId; }
    public void setPackageId(String packageId) { this.packageId = packageId; }

    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }

    public int getGroupSize() { return groupSize; }
    public void setGroupSize(int groupSize) { this.groupSize = groupSize; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
}