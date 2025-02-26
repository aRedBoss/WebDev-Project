const User = require('../models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { validateUsername, validatePassword, validateLogin } = require('../validateCredentials');

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
}
const reqAccessToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token required' });

    try {
        const user = await User.findOne({ refreshToken: refreshToken })
        if (!user) return res.status(403).json({ error: 'invalid refresh token' });

        jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err || user._id.toString() !== decoded.id) {
                return res.status(403).json({ error: 'Invalid refresh token' });
            }
            const AccessToken = generateAccessToken(user);
            res.status(200).json({ AccessToken });
        });

    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
}


const register = async (req, res) => {
    const { username, password } = req.body;

    // Validate username
    const usernameError = validateUsername(username);
    if (usernameError) {
        return res.status(usernameError.statusCode).json({ error: usernameError.error });
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
        return res.status(passwordError.statusCode).json({ error: passwordError.error });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, password: hashedPassword })
        await user.save();

        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        console.error("Server Error:", error); // Debugging
        res.status(500).json({ error: "Server error" });
    }



}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const loginError = validateLogin(username, password);
        if (loginError) {
            return res.status(loginError.statusCode).json({ error: loginError.error })
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Wrong password' })
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({
            message: 'Login successful',
            accessToken: accessToken,
            refreshToken,
        })

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Server error' })
    }

}

module.exports = {
    register,
    login,
    reqAccessToken
};