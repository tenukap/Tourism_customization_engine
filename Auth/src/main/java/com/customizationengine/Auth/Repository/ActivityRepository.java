package com.customizationengine.Auth.Repository;

import com.customizationengine.Auth.Model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    // Find all activities belonging to a specific package
    List<Activity> findByPackageId(Long packageId);
}