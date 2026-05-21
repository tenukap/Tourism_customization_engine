package com.customizationengine.Auth.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "customization_drafts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomizationDraft {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    // Hardcoded to 1L until Tharusha merges Package Management
    @Column(nullable = false)
    private Long packageId = 1L;

    @ElementCollection
    private List<Long> selectedActivityIds;

    @Column(nullable = false)
    private int groupSize;

    @Column(nullable = false)
    private double totalPrice;
}