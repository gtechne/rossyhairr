import Product from '../models/Product.js';
import Review from '../models/Review.js';

const calculateAverageRating = async (productId) => {
  const reviews = await Review.find({ product: productId });

  if (reviews.length === 0) {
    await Product.findByIdAndUpdate(productId, { averageRating: 0, numReviews: 0 });
    return;
  }

  const avgRating = (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  ).toFixed(1);

  await Product.findByIdAndUpdate(productId, {
    averageRating: avgRating,
    numReviews: reviews.length,
  });
};

export default calculateAverageRating;
