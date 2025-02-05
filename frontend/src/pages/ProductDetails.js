import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { fetchUserAddToCart } = useContext(Context);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);

      // Fetch product details
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: params?.id })
      });

      const dataResponse = await response.json();
      if (dataResponse.success) {
        setData(dataResponse?.data);
        setActiveImage(dataResponse?.data?.productImage[0]);
      }

      // Fetch reviews
      const reviewResponse = await fetch(`${SummaryApi.getReviews.url}/${params.id}`);
      const reviewData = await reviewResponse.json();
      if (reviewData.success) {
        setReviews(reviewData.reviews);
      }
    } catch (error) {
      console.error("Error fetching product details or reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  const handleReviewProduct = () => {
    navigate(`/review-product/${params.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img src={activeImage} className="h-full w-full object-scale-down mix-blend-multiply" alt="Product" />
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((_, index) => (
                  <div key={index} className="h-20 w-20 bg-slate-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => (
                  <div key={index} className="h-20 w-20 bg-slate-200 rounded p-1">
                    <img
                      src={imgURL}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      alt="Thumbnail"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      onClick={() => handleMouseEnterProduct(imgURL)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full"></h2>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">{data?.brandName}</p>
            <h2 className="text-2xl lg:text-4xl font-medium">{data?.productName}</h2>
            <p className="capitalize text-slate-400">{data?.category}</p>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">{displayINRCurrency(data.sellingPrice)}</p>
              <p className="text-slate-400 line-through">{displayINRCurrency(data.price)}</p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white" onClick={(e) => handleBuyProduct(e, data?._id)}>
                Buy
              </button>
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white" onClick={(e) => handleAddToCart(e, data?._id)}>
                Add To Cart
              </button>
              <button className="border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-blue-600 hover:text-blue-600 hover:bg-white" onClick={handleReviewProduct}>
                Review Product
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description:</p>
              <p>{data?.description}</p>
            </div>

            {/* Reviews Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="border p-4 mt-2 rounded shadow">
                    <div className="flex items-center">
                      <div className="text-yellow-500 flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <p className="ml-2 text-gray-600">by {review.userId.name}</p>
                    </div>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
              )}
            </div>

            {/* Static Star Ratings */}
            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
          </div>
        )}
      </div>

      {/* Recommended Products */}
      {data.category && <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Products"} />}
    </div>
  );
};

export default ProductDetails;