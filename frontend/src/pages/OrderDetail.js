import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SummaryApi from "../common";

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(SummaryApi.orderDetails.url(orderId), {
                    method: SummaryApi.orderDetails.method,
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });

                const responseData = await response.json();
                if (responseData.success) {
                    setOrder(responseData.data);
                    setSelectedStatus(responseData.data.orderStatus); // Initialize dropdown
                } else {
                    alert("Failed to fetch order details.");
                }
            } catch (error) {
                console.error("Error fetching order details:", error);
                alert("Failed to fetch order details. Please try again later.");
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    

   

    if (!order) {
        return <p className="text-center">Loading order details...</p>;
    }

    return (
        <section className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Order Details</h2>

            {/* Order Information */}
            <div className="bg-white shadow-md p-4 rounded-lg">
                <p><strong>Order ID:</strong> {order.paymentDetails.paymentReference}</p>
                <p><strong>Order Amount:</strong> ₦{order?.totalAmount ? order.totalAmount.toFixed(2) : "N/A"}</p>
                <p><strong>Order Status:</strong> {order.orderStatus}</p>
                
            </div>

            {/* Product List Table */}
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 border">S/N</th>
                            <th className="py-2 px-4 border">Product</th>
                            <th className="py-2 px-4 border">Order Amount (₦)</th>
                            <th className="py-2 px-4 border">Quantity</th>
                            <th className="py-2 px-4 border">Total (₦)</th>
                            <th className="py-2 px-4 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.productDetails.map((product, index) => (
                            <tr key={product._id} className="border-b text-center">
                                <td className="py-2 px-4 border">{index + 1}</td>
                                <td className="py-2 px-4 border flex items-center gap-2">
                                    <img
                                        src={product?.productId?.productImage?.[0] || "/placeholder.jpg"}
                                        alt={product?.productId?.productName || "Product Image"}
                                        className="w-10 h-10 object-cover rounded"
                                    />
                                    {product?.productId?.productName || "Unknown Product"}
                                </td>
                                <td className="py-2 px-4 border">{(order.totalAmount / product.quantity).toFixed(2)}</td>
                                <td className="py-2 px-4 border">{product.quantity}</td>
                                <td className="py-2 px-4 border">
                                    {(order.totalAmount ).toFixed(2)}
                                </td>
                                <td className="py-2 px-4 border">
                                <Link to={`/review-product/${product?.productId?._id}`}>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                            Review Product
                                        </button>
                                </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            
        </section>
    );
};

export default OrderDetail;
