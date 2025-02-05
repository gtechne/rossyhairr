const axios = require('axios');
const orderModel = require('../../models/orderProductModel');

const verifyPaymentController = async (request, response) => {
    try {
        const { reference } = request.body;

        const paystackResponse = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        const { status, amount, metadata } = paystackResponse.data.data;

        if (status === 'success') {
            // Update the order status to 'success'
            const order = await orderModel.findOne({ 'paymentDetails.paymentId': reference });
            if (order) {
                order.paymentDetails.payment_status = 'success';
                await order.save();
            }

            response.status(200).json({
                message: "Payment verified successfully",
                success: true,
                data: order,
            });
        } else {
            response.status(400).json({
                message: "Payment verification failed",
                success: false,
            });
        }
    } catch (error) {
        response.status(500).json({
            message: error?.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = verifyPaymentController;