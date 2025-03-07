const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    // verify auth
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = await User.findById(id).select('_id');
        if (!req.user) {
            throw new Error('User not found');
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' })
    }

}

module.exports = requireAuth;