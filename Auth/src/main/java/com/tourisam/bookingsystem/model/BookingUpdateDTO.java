package com.tourisam.bookingsystem.model;

public class BookingUpdateDTO {

    private int guests;
    private int nights;
    private String dest;

    public BookingUpdateDTO() {
    }

    public int getGuests() {
        return guests;
    }

    public void setGuests(int guests) {
        this.guests = guests;
    }

    public int getNights() {
        return nights;
    }

    public void setNights(int nights) {
        this.nights = nights;
    }

    public String getDest() {
        return dest;
    }

    public void setDest(String dest) {
        this.dest = dest;
    }
}