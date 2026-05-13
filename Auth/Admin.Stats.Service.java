public class AdminStatsService {

    import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // Initialize the service
        StatisticsService statsService = new StatisticsService();

        // Print the results to the console
        System.out.println("--- Dashboard Statistics ---");
        System.out.println("Total Users: " + statsService.getTotalUsers());
        System.out.println("Total Revenue: $" + statsService.getTotalRevenue());
        System.out.println("Total Pending Reviews: " + statsService.getTotalPendingReviews());
    }
}

class StatisticsService {

    /**
     * In a real app, this would query a database.
     * Here, we return a hardcoded value that will not cause errors.
     */
    public Long getTotalUsers() {
        return 1250L; 
    }

    /**
     * Returns the total revenue as a Double.
     */
    public Double getTotalRevenue() {
        return 45900.75;
    }

    /**
     * Returns the number of reviews waiting for approval.
     */
    public Long getTotalPendingReviews() {
        return 15L;
    }
}
