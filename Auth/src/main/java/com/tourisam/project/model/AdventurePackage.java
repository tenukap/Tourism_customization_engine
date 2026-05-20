package com.tourisam.project.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdventurePackage extends TourPackage {

    private String difficultyLevel;
    private static final double SURCHARGE = 0.15;

    public AdventurePackage() { super(); }

    @Override
    public double calculateFinalPrice() {
        return getBasePrice() * (1 + SURCHARGE);}

    @Override
    public String getPackageType() {
        return "Adventure Package [" + difficultyLevel + "]";
    }
}
