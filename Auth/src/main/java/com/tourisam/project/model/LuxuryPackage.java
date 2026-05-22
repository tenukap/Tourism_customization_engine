package com.tourisam.project.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LuxuryPackage extends TourPackage {

    private String hotelRating;
    private static final double PREMIUM = 0.30;

    public LuxuryPackage() { super(); }

    @Override
    public double calculateFinalPrice() {
        return getBasePrice() * (1 + PREMIUM);
    }

    @Override
    public String getPackageType() {
        return "Luxury Package [" + hotelRating + "]";
    }
}
