package com.customizationengine.Auth.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "premium_activities")
@Data
@NoArgsConstructor
public class PremiumActivity extends Activity {

    @Column(nullable = false)
    private double discountRate = 0.0;

    public PremiumActivity(Long id, String name, String description,
                           double pricePerPerson, Long packageId, double discountRate) {
        super(id, name, description, pricePerPerson, packageId);
        this.discountRate = discountRate;
    }

    // Polymorphism — overrides parent price with discount applied
    @Override
    public double getPricePerPerson() {
        return super.getPricePerPerson() * (1 - discountRate);
    }
}
