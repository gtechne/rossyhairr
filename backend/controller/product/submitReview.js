// controller/product/submitReview.js
const Review = require('../../models/reviewModel');

const submitReview = async (req, res) => {
  try {
    const { productId, rating, review } = req.body;

    // Validate required fields
    if (!productId || !rating || !review) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "productId, rating and review comment are required."
      });
    }

    // Optionally, you could also validate that the product exists

    // Create a new review using the userId provided by the auth middleware
    const newReview = new Review({
      productId,
      userId: req.userId, // Set by the authToken middleware after token verification
      rating,
      comment: review
    });

    await newReview.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: "Review submitted successfully.",
      data: newReview
    });
  } catch (err) {
    console.error("Error submitting review:", err);
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message || "Internal server error"
    });
  }
};

module.exports = submitReview;
