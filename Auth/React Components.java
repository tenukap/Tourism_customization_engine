public class Main {
    public static void main(String[] args) {
        int rating = 3; // Change this number to test different ratings
        
        System.out.println("Star Rating (" + rating + "/5):");
        printStars(rating);
    }

    public static void printStars(int rating) {
        for (int i = 0; i < 5; i++) {
            if (i < rating) {
                // Unicode for filled star
                System.out.print("★ ");
            } else {
                // Unicode for empty star
                System.out.print("☆ ");
            }
        }
        System.out.println(); 
    }
}
