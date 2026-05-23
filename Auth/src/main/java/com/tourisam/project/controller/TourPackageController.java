package com.tourisam.project.controller;

import com.tourisam.project.model.TourPackage;
import com.tourisam.project.service.TourPackageService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class TourPackageController {

    private final TourPackageService service;

    public TourPackageController(TourPackageService service) {
        this.service = service;
    }

    // Show all packages
    @GetMapping("/packages")
    public String getAllPackages(Model model) {
        model.addAttribute("packages", service.getAllPackages());
        return "package-list";
    }

    // Show add form
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("tourPackage", new TourPackage());
        return "add-package";
    }

    // Save package
    @PostMapping("/save")
    public String savePackage(@ModelAttribute TourPackage tourPackage) {
        service.addPackage(tourPackage);
        return "redirect:/packages";
    }

    // Delete package
    @GetMapping("/delete/{id}")
    public String deletePackage(@PathVariable Long id) {
        service.deletePackage(id);
        return "redirect:/packages";
    }
}