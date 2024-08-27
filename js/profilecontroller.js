
// In your profileController.js
const User = require('../models/User');

exports.updateProfile = async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = await User.findByIdAndUpdate(req.user, { name, email }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};