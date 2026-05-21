package com.customizationengine.Auth.Service;

import com.customizationengine.Auth.Model.Activity;
import com.customizationengine.Auth.Model.CustomizationDraft;
import com.customizationengine.Auth.Repository.ActivityRepository;
import com.customizationengine.Auth.Repository.CustomizationDraftRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomizationService {

    private final ActivityRepository activityRepository;
    private final CustomizationDraftRepository draftRepository;

    public CustomizationService(ActivityRepository activityRepository,
                                CustomizationDraftRepository draftRepository) {
        this.activityRepository = activityRepository;
        this.draftRepository = draftRepository;
    }

    // CREATE - Save new draft
    public CustomizationDraft saveDraft(CustomizationDraft draft) {
        double total = calculateTotal(draft.getSelectedActivityIds(), draft.getGroupSize());
        draft.setTotalPrice(total);
        return draftRepository.save(draft);
    }

    // READ - Get draft by user
    public Optional<CustomizationDraft> getDraftByUser(Long userId) {
        return draftRepository.findByUserId(userId);
    }

    // UPDATE - Update existing draft
    public CustomizationDraft updateDraft(Long id, CustomizationDraft updated) {
        updated.setId(id);
        double total = calculateTotal(updated.getSelectedActivityIds(), updated.getGroupSize());
        updated.setTotalPrice(total);
        return draftRepository.save(updated);
    }

    // DELETE - Remove a draft
    public void deleteDraft(Long id) {
        draftRepository.deleteById(id);
    }

    // GET all activities
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    // ADD a new activity
    public Activity addActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    // Price calculation logic
    private double calculateTotal(List<Long> activityIds, int groupSize) {
        List<Activity> activities = activityRepository.findAllById(activityIds);
        double total = 0;
        for (Activity a : activities) {
            total += a.getPricePerPerson() * groupSize;
        }
        return total;
    }
}