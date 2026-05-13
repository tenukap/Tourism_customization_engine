import java.util.List;
import java.util.ArrayList;

class Review {

    private int rating;

    
    public Review(int rating) {
        this.rating = rating;
    }

    
    public int getRating() {
        return rating;
    }

    
    public void setRating(int rating) {
        this.rating = rating;
    }
}

class ReviewService {

    
    public Review saveReview(Review review) {

        if (review.getRating() < 1 || review.getRating() > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        return review;
    }

    
    public List<Review> getAllReviews() {
        return new ArrayList<>();
    }
}

public class Main {

    public static void main(String[] args) {

        
        Review review = new Review(4);

        
        ReviewService service = new ReviewService();

        
        service.saveReview(review);

        
        System.out.println("Review saved successfully");
    }
}
