// models/reviewModel.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

// Middleware to update average rating
reviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.product);
});
reviewSchema.post('remove', async function () {
  await this.constructor.calculateAverageRating(this.product);
});

reviewSchema.statics.calculateAverageRating = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    { $group: { _id: '$product', avgRating: { $avg: '$rating' }, numReviews: { $sum: 1 } } }
  ]);

  await mongoose.model('Product').findByIdAndUpdate(productId, {
    averageRating: stats[0]?.avgRating.toFixed(1) || 0,
    numReviews: stats[0]?.numReviews || 0,
  });
};


module.exports = mongoose.model('Review', reviewSchema);
