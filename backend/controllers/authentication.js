const router = require('express').Router();
const db = require("../models");
const bcrypt = require('bcrypt');

const { User } = db;

router.post('/', async (req, res) => {
    try {
        let user = await User.findOne({ where: { email: req.body.email } });

        if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
            res.status(401).json({ message: "Invalid credentials." });
        } else {
            // Prepare user data for response, excluding sensitive information
            const userData = {
                id: user.id,
                email: user.email,
                // other safe user fields
            };
            res.json({ user: userData });

            // Add session or token creation here if applicable
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred during login." });
    }
});

module.exports = router;
