import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common/index';

const OrderSuccess = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { orderId } = useParams();

    useEffect(() => {
        const fetchOrder = async () => {
            const response = await fetch(`${SummaryApi.getOrder.url}/${orderId}`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            const responseData = await response.json();
            if (responseData.success) {
                setOrder(responseData.data);
            } else {
                // Handle error, order not found
            }
            setLoading(false);
        };
        fetchOrder();
    }, [orderId]);

    if (loading) return <p>Loading...</p>;

    return (
        <section className="container mx-auto p-4">
            {order ? (
                <>
                    <h2 className="text-2xl font-bold text-center mb-4">Order Confirmation</h2>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-3">Order ID: {order._id}</h3>
                        <p className="text-lg mb-3">Total Amount: {order.totalAmount} NGN</p>
                        <p className="text-lg mb-3">Shipping Address: {order.shipping_options.address}</p>
                        {/* Add more order details as needed */}
                    </div>
                </>
            ) : (
                <p className="text-red-600 font-bold">Order not found</p>
            )}
        </section>
    );
};

export default OrderSuccess;
