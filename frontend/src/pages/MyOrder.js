import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(SummaryApi.getOrder.url, {
                    method: SummaryApi.getOrder.method,
                    credentials: "include",
                    headers: { "content-type": "application/json" },
                });

                const responseData = await response.json();
                if (responseData.success) {
                    setOrders(responseData.data);
                } else {
                    alert("Failed to load orders.");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                alert("Failed to load orders. Please try again later.");
            }
        };

        fetchOrders();
    }, []);

    return (
        <section className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">My Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 border">S/N</th>
                            <th className="py-2 px-4 border">Date</th>
                            <th className="py-2 px-4 border">Order ID</th>
                            <th className="py-2 px-4 border">Order Amount (₦)</th>
                            <th className="py-2 px-4 border">Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order._id} className="border-b text-center">
                                    <td className="py-2 px-4 border">{index + 1}</td>
                                    <td className="py-2 px-4 border">
                                    {format(new Date(order.createdAt), "dd MMM yyyy")}
                                    </td>
                                    <td className="py-2 px-4 border"
                                    onClick={() => navigate(`/order-detail/${order._id}`)}
                                    >{order.paymentDetails.paymentReference}</td>
                                    <td className="py-2 px-4 border">{order.totalAmount.toFixed(2)}</td>
                                    <td className="py-2 px-4 border">{order.orderStatus || "Order Placed"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-4 text-center">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MyOrders;
