import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";

const ReviewProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(SummaryApi.productDetails.url, {
                    method: SummaryApi.productDetails.method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId }),
                });

                const responseData = await response.json();
                if (responseData.success) {
                    setProduct(responseData.data);
                } else {
                    alert("Failed to fetch product details.");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(SummaryApi.submitReview.url, {
                method: SummaryApi.submitReview.method,
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, rating, review }),
            });

            const responseData = await response.json();
            if (responseData.success) {
                alert("Review submitted successfully!");
                navigate(-1); // Go back to the previous page
            } else {
                alert("Failed to submit review.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Review Product</h2>
            {product && (
                <div className="flex items-center gap-4 mb-4">
                    <img src={product?.productImage?.[0] || "/placeholder.jpg"} alt={product.productName} className="w-20 h-20 object-cover rounded" />
                    <h3 className="text-lg font-semibold">{product.productName}</h3>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg">
                <div className="mb-4">
                    <label className="block font-medium">Rating:</label>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar key={star} className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-400"}`} onClick={() => setRating(star)} />
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block font-medium">Review:</label>
                    <textarea className="w-full p-2 border rounded" value={review} onChange={(e) => setReview(e.target.value)} required />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewProduct;