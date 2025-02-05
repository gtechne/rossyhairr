import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";

const OrderDetails = () => {
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

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const updateOrderStatus = async () => {
        if (!order) {
            alert("Order not found.");
            return;
        }

        try {
            const response = await fetch(SummaryApi.updateOrderStatus.url(order._id), {
                method: SummaryApi.updateOrderStatus.method,
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderStatus: selectedStatus }),
            });

            const responseData = await response.json();
            if (responseData.success) {
                setOrder((prev) => ({ ...prev, orderStatus: selectedStatus }));
                alert("Order status updated successfully.");
            } else {
                alert("Failed to update order status: " + responseData.message);
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update order status. Try again.");
        }
    };

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
                <p><strong>Recipient Name:</strong> {order?.shipping_options?.recipientName || "N/A"}</p>
                <p><strong>Address:</strong> {order?.shipping_options?.address || "N/A"}</p>
                <p><strong>City:</strong> {order?.shipping_options?.city || "N/A"}</p>
                <p><strong>State:</strong> {order?.shipping_options?.state || "N/A"}</p>
                <p><strong>Country:</strong> {order?.shipping_options?.country || "N/A"}</p>
                <p><strong>Phone:</strong> {order?.shipping_options?.phone || "N/A"}</p>
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
                            <th className="py-2 px-4 border">Order Status</th>
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
                                <td className="py-2 px-4 border">{order.orderStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Status Section */}
            <div className="mt-6">
                <h3 className="text-lg font-bold">Update Order Status</h3>
                <select value={selectedStatus} onChange={handleStatusChange} className="ml-2 p-1 border rounded">
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <button 
                    onClick={updateOrderStatus} 
                    className="ml-4 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                    Update Status
                </button>
            </div>
        </section>
    );
};

export default OrderDetails;
