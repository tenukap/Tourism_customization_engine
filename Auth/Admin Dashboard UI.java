public class Main {
    public static void main(String[] args) {
        // 1. Defining the data (Stats)
        int totalUsers = 1250;
        String totalRevenue = "$45,000";
        int activeReviews = 89;

        // 2. Rendering the "UI" to the Console
        System.out.println("************************************");
        System.out.println("         SYSTEM OVERVIEW           ");
        System.out.println("************************************");
        
        System.out.printf("Total Users:      %d%n", totalUsers);
        System.out.printf("Total Revenue:    %s%n", totalRevenue);
        System.out.printf("Pending Reviews:  %d%n", activeReviews);
        
        System.out.println("************************************");
        System.out.println(" Chart: Monthly Growth (Mockup)     ");
        System.out.println("************************************");
    }
}
