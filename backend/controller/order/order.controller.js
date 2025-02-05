const orderModel = require("../../models/orderProductModel");

const orderController = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

        res.json({
            data: orders,
            message: "Order list retrieved successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
};

module.exports = orderController;
