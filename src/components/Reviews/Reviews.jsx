import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // доступ до параметрів поточного URL
import { fetchMovieReviews } from '../../services/api';
import {
  Author,
  NoReviewsText,
  Review,
  ReviewHeader,
  ReviewList,
  ReviewListItem,
  Wrapper,
} from './Reviews.styled'; // додаємо стилі

const Reviews = () => {
  const { movieId } = useParams(); // додаємо доступ до параметрів поточного URL
  const [reviews, setReviews] = useState([]); // додаємо стейт для відгуків

  // додаємо запит на відгуки
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { results } = await fetchMovieReviews(movieId);
        setReviews(results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <Wrapper>
      <ReviewHeader>Reviews</ReviewHeader>

      {/* додаємо перевірку на наявність відгуків */}
      {reviews.length ? (
        <ReviewList className="reviews-container">
          {reviews.map(review => (
            <ReviewListItem className="review-card" key={review.id}>
              <Author>Author: {review.author}</Author>
              <Review>{review.content}</Review>
            </ReviewListItem>
          ))}
        </ReviewList>
      ) : (
        <NoReviewsText>
          We don't have any reviews for this movie yet.
        </NoReviewsText>
      )}
    </Wrapper>
  );
};
export default Reviews;

// Діма Берестень
