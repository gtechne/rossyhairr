const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);
const userModel = require("../../models/userModel");
const orderModel = require("../../models/orderProductModel");

const paymentController = async (req, res) => {
    try {
        const { reference, shippingDetails, cartItems } = req.body;

        if (!reference || !shippingDetails || !cartItems) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const user = await userModel.findOne({ _id: req.userId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Verify payment with Paystack
        const verifyPayment = await paystack.transaction.verify(reference);

        if (!verifyPayment || verifyPayment.data.status !== "success") {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        // Create order
        const newOrder = new orderModel({
            productDetails: cartItems,
            email: user.email,
            userId: req.userId,
            totalAmount: verifyPayment.data.amount / 100, // Convert to NGN
            paymentDetails: {
                paymentId: verifyPayment.data.id,
                paymentReference: verifyPayment.data.reference, // Save Paystack transaction reference
                payment_method_type: ["paystack"],
                payment_status: verifyPayment.data.status,
            },
            shipping_options: shippingDetails,
        });

        await newOrder.save();
        
        return res.json({ success: true, message: "Order placed successfully", order: newOrder });

    } catch (error) {
        console.error("Error in payment controller:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = paymentController;
