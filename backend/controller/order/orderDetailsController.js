const orderModel = require("../../models/orderProductModel");

const orderDetailsController = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Find order by ID
        const order = await orderModel.findById(orderId).populate("productDetails.productId");

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.json({
            success: true,
            data: order,
            message: "Order details retrieved successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || error });
    }
};

module.exports = orderDetailsController;
