package com.customizationengine.Auth.Repository;

import com.customizationengine.Auth.Model.CustomizationDraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CustomizationDraftRepository extends JpaRepository<CustomizationDraft, Long> {

    // Find a draft belonging to a specific user
    Optional<CustomizationDraft> findByUserId(Long userId);
}