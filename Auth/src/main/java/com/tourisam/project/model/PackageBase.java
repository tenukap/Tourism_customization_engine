package com.tourisam.project.model;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
public abstract class PackageBase {

    //encapsulation
    private String name;
    private String description;
    private double basePrice;
    private int durationDays;

    public abstract String getPackageType();
    public abstract double calculateFinalPrice();

    public String getSummary() {
        return getPackageType()
                + " | " + name
                + " | " + durationDays + " days"
                + " | $ " + String.format("%.2f", calculateFinalPrice());
    }
}
