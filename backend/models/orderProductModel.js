const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    productDetails: { type: Array, default: [] },
    email: { type: String, default: "" },
    userId: { type: String, default: "" },
    paymentDetails: {
        paymentId: { type: String, default: "" },
        paymentReference: { type: String, default: "" },
        payment_method_type: [],
        payment_status: { type: String, default: "" },
    },
    shipping_options: { type: Object, default: {} }, // Save shipping details
    totalAmount: { type: Number, default: 0 },
    orderStatus: { type: String, default: "Order Placed" }, // Default status
}, { timestamps: true });

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
