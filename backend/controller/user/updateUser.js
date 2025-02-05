const userModel = require("../../models/userModel")

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId; // Extracted from token (set in middleware)

        if (!sessionUser) {
            return res.status(401).json({
                message: "Unauthorized: Please log in",
                error: true,
                success: false
            });
        }

        const { email, name, role, profilePic, address, phone } = req.body;

        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role }),
            ...(profilePic && { profilePic }),
            ...(address && { address }),
            ...(phone && { phone }),
        };

        const user = await userModel.findByIdAndUpdate(sessionUser, payload, { new: true });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        res.json({
            data: user,
            message: "User Updated",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || "Error updating profile",
            error: true,
            success: false
        });
    }
}

module.exports = updateUser;
