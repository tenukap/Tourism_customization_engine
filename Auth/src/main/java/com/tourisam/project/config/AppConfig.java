package com.tourisam.project.config;

import com.tourisam.project.model.TourPackage;
import com.tourisam.project.repository.PackageRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(
                                "http://localhost:5173",  // tenuka's frontend
                                "http://localhost:3000"   // myfrontend
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }

    @Bean
    public CommandLineRunner loadSampleData(PackageRepository repo) {
        return args -> {
            if (repo.count() > 0) {
                System.out.println("✅ Sample data already loaded.");
                return;
            }
            System.out.println("📦 Loading sample packages...");

            repo.save(pkg("Ella Highlands Adventure",
                    "Experience breathtaking Ella with scenic train rides, hiking to Ella Rock, and the iconic Nine Arch Bridge.",
                    45000, 5, "Ella", "Adventure",
                    "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800"));

            repo.save(pkg("Sigiriya Heritage Explorer",
                    "Climb the legendary Sigiriya Rock Fortress and explore Dambulla Cave Temple with expert local guides.",
                    38000, 3, "Sigiriya", "Cultural",
                    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800"));

            repo.save(pkg("Maldives Luxury Getaway",
                    "Exclusive overwater villa experience with private beach access, sunset cruises, and world-class spa treatments.",
                    250000, 7, "Maldives", "Luxury",
                    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800"));

            repo.save(pkg("Unawatuna Beach Retreat",
                    "Relax on golden Unawatuna beaches, snorkel in turquoise waters, and explore historic Galle Fort.",
                    32000, 4, "Unawatuna", "Beach",
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"));

            repo.save(pkg("Yala Wildlife Safari",
                    "Thrilling jeep safari in Yala National Park — spot leopards, elephants, and exotic birds.",
                    55000, 3, "Yala", "Wildlife",
                    "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800"));

            repo.save(pkg("Nuwara Eliya Tea Country",
                    "Rolling green tea estates, factory tours, cool mountain air, and colonial-era bungalow stays.",
                    28000, 3, "Nuwara Eliya", "Cultural",
                    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"));

            repo.save(pkg("Arugam Bay Surf & Sun",
                    "Ride the waves at Asia's top surf destination. Lessons, yoga, and beachside dining included.",
                    42000, 6, "Arugam Bay", "Adventure",
                    "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800"));

            repo.save(pkg("Colombo City Luxury Stay",
                    "Five-star accommodation, fine dining, shopping, and curated visits to Colombo's landmarks.",
                    85000, 4, "Colombo", "Luxury",
                    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"));

            System.out.println("✅ " + repo.count() + " packages loaded!");
        };
    }

    private TourPackage pkg(String name, String desc, double price, int days,
                            String dest, String cat, String img) {
        TourPackage p = new TourPackage();
        p.setName(name);
        p.setDescription(desc);
        p.setBasePrice(price);
        p.setDurationDays(days);
        p.setDestination(dest);
        p.setCategory(cat);
        p.setImageUrl(img);
        p.setCreatedBy(1L);
        return p;
    }
}
