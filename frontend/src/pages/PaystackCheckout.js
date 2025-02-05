import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import displayINRCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common";

const PaystackCheckout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [shipping, setShipping] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(SummaryApi.addToCartProductView.url, {
                    method: SummaryApi.addToCartProductView.method,
                    credentials: "include",
                    headers: { "content-type": "application/json" },
                });

                const responseData = await response.json();
                if (responseData.success) {
                    setCartItems(responseData.data);
                } else {
                    alert("Failed to load cart data.");
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
                alert("Failed to load cart data.");
            }
        };

        fetchCart();

        const savedShipping = localStorage.getItem("paystackShipping");
        if (savedShipping) {
            setShipping(JSON.parse(savedShipping));
        }
    }, []);
    const totalQty = cartItems.reduce((prev, curr) => prev + curr.quantity, 0);
    const totalPrice = cartItems.reduce((prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice, 0);

    const handlePaymentSuccess = async (reference) => {
        try {
            const response = await fetch(SummaryApi.payment.url, {
                method: SummaryApi.payment.method,
                credentials: "include",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    reference: reference.reference,
                    shippingDetails: shipping,
                    cartItems,
                }),
            });

            const result = await response.json();
            if (result.success) {
                alert("Payment Successful! Order has been placed.");
                navigate("/success");
            } else {
                alert("Payment verification failed.");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
        }
    };

    const paystackConfig = {
        publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
        email: shipping.email || "user@example.com",
        amount: totalPrice * 100,
        currency: "NGN",
        onSuccess: handlePaymentSuccess,
        onClose: () => alert("Transaction was not completed"),
    };

    return (
        <section className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Order Summary</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Total Quantity: {totalQty}</h3>
                <h3 className="text-xl font-semibold mb-3">Total Price: {displayINRCurrency(totalPrice)}</h3>
                {shipping.email && (
                    <PaystackButton
                        className="bg-blue-600 text-white w-full p-3 mt-4 rounded hover:bg-blue-700"
                        {...paystackConfig}
                    />
                )}
            </div>
        </section>
    );
};

export default PaystackCheckout;
