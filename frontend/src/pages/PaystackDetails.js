import React, { useContext, useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useNavigate } from "react-router-dom";
import displayINRCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common";
import Context from "../context";

const PaystackDetails = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [shipping, setShipping] = useState({
        recipientName: "",
        address: "",
        city: "",
        state: "",
        country: "",
        phone: "",
        email: "",
    });

    const context = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetchCartData();
        setLoading(false);
    }, []);

    const fetchCartData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        });

        const responseData = await response.json();
        if (responseData.success) {
            setData(responseData.data);
        }
    };

    const handleChange = (e) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    };

    const handleProceedToCheckout = async (e) => {
        e.preventDefault();
    
        if (!shipping.recipientName || !shipping.address || !shipping.city || !shipping.state || !shipping.country || !shipping.phone || !shipping.email) {
            alert("Please fill all required fields.");
            return;
        }
    
        try {
            const response = await fetch(SummaryApi.saveShippingDetails.url, {
                method: SummaryApi.saveShippingDetails.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ shippingDetails: shipping }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData = await response.json();
    
            if (responseData.success) {
                localStorage.setItem("paystackShipping", JSON.stringify(shipping));
                navigate("/paystack-checkout");
            } else {
                alert(responseData.message || "Error saving shipping details. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to proceed to checkout. Please try again.");
        }
    };
    

    const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice, 0);

    return (
        <section className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Checkout Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Shipping Form */}
                <form onSubmit={handleProceedToCheckout} className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-3">Shipping Address</h3>

                    <label className="block mb-1">Recipient Name</label>
                    <input type="text" name="recipientName" value={shipping.recipientName} onChange={handleChange} className="border p-2 w-full mb-3 rounded" required />

                    <label className="block mb-1">Address</label>
                    <input type="text" name="address" value={shipping.address} onChange={handleChange} className="border p-2 w-full mb-3 rounded" required />

                    <label className="block mb-1">City</label>
                    <input type="text" name="city" value={shipping.city} onChange={handleChange} className="border p-2 w-full mb-3 rounded" required />

                    <label className="block mb-1">State</label>
                    <input type="text" name="state" value={shipping.state} onChange={handleChange} className="border p-2 w-full mb-3 rounded" required />

                    <label className="block mb-1">Country</label>
                    <CountryDropdown valueType="short" value={shipping.country} onChange={(val) => setShipping({ ...shipping, country: val })} className="border p-2 w-full mb-3 rounded" required />

                    <label className="block mb-1">Phone</label>
                    <input type="text" name="phone" value={shipping.phone} onChange={handleChange} className="border p-2 w-full mb-3 rounded" required />

                    <label className="block mb-1">Email</label>
                    <input type="email" name="email" value={shipping.email} onChange={handleChange} className="border p-2 w-full mb-3 rounded" required />

                    <button type="submit" className="bg-blue-600 text-white w-full p-3 mt-4 rounded hover:bg-blue-700">Proceed To Checkout</button>
                </form>

                {/* Cart Summary */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-3 bg-red-600 text-white p-2 rounded">Order Summary</h3>
                    <p className="flex justify-between text-lg font-medium text-gray-700">
                        <span>Total Quantity:</span>
                        <span>{totalQty}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium text-gray-700">
                        <span>Total Price:</span>
                        <span>{displayINRCurrency(totalPrice)}</span>
                    </p>
                </div>

            </div>
        </section>
    );
};

export default PaystackDetails;