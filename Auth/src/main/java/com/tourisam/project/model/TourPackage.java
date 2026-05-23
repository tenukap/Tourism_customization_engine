package com.tourisam.project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tour_packages")
public class TourPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String destination;
    private String category;
    private double price;
    private int duration;
    private int availableSlots;

    public TourPackage() {
    }

    public TourPackage(Long id, String name, String destination, String category, double price, int duration, int availableSlots) {
        this.id = id;
        this.name = name;
        this.destination = destination;
        this.category = category;
        this.price = price;
        this.duration = duration;
        this.availableSlots = availableSlots;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getAvailableSlots() {
        return availableSlots;
    }

    public void setAvailableSlots(int availableSlots) {
        this.availableSlots = availableSlots;
    }

    public String getAvailabilityStatus() {
        if (availableSlots == 0) {
            return "Fully Booked";
        } else if (availableSlots <= 5) {
            return "Limited Slots";
        } else {
            return "Available";
        }
    }
}