const userModel = require("../models/userModel");

const saveShippingDetails = async (req, res) => {
    try {
        const { shippingDetails } = req.body;
        const userId = req.userId; // Extract user ID from auth middleware

        if (!shippingDetails) {
            return res.status(400).json({ success: false, message: "Shipping details are required" });
        }

        // Update the user's shipping details
        await userModel.findByIdAndUpdate(userId, { shippingDetails }, { new: true });

        res.json({ success: true, message: "Shipping details saved successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = saveShippingDetails;
