package com.customizationengine.Auth.Controller;

import com.customizationengine.Auth.Model.Activity;
import com.customizationengine.Auth.Model.CustomizationDraft;
import com.customizationengine.Auth.Service.CustomizationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/customization")
public class CustomizationController {

    private final CustomizationService customizationService;

    public CustomizationController(CustomizationService customizationService) {
        this.customizationService = customizationService;
    }

    // GET all activities
    @GetMapping("/activities")
    public ResponseEntity<List<Activity>> getActivities() {
        return ResponseEntity.ok(customizationService.getAllActivities());
    }

    // POST add new activity
    @PostMapping("/activities")
    public ResponseEntity<Activity> addActivity(@RequestBody Activity activity) {
        return ResponseEntity.ok(customizationService.addActivity(activity));
    }

    // POST save new draft
    @PostMapping("/draft")
    public ResponseEntity<CustomizationDraft> saveDraft(@RequestBody CustomizationDraft draft) {
        return ResponseEntity.ok(customizationService.saveDraft(draft));
    }

    // GET draft by user ID
    @GetMapping("/draft/{userId}")
    public ResponseEntity<?> getDraft(@PathVariable Long userId) {
        return customizationService.getDraftByUser(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT update existing draft
    @PutMapping("/draft/{id}")
    public ResponseEntity<CustomizationDraft> updateDraft(@PathVariable Long id,
                                                          @RequestBody CustomizationDraft draft) {
        return ResponseEntity.ok(customizationService.updateDraft(id, draft));
    }

    // DELETE a draft
    @DeleteMapping("/draft/{id}")
    public ResponseEntity<String> deleteDraft(@PathVariable Long id) {
        customizationService.deleteDraft(id);
        return ResponseEntity.ok("Draft deleted successfully");
    }
}