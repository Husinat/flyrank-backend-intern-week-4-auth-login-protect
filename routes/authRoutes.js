const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// STAGE 1: git log -1 --onelineOpen Auth: Sign Up & Log In
// Signup route
router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: data.user,
            session: data.session
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});



// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid login credentials"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: data.user,
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});





module.exports = router;