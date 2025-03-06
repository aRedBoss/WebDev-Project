const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

const {
    register,
    login,
    reqAccessToken
} = require('../controllers/authController');

// GET /users
router.get('/', getAllUsers);

// POST /users
router.post('/', createUser)

router.post("/register", register);

router.post("/login", login);

router.post("/reqNewAccessToken", reqAccessToken);

// GET /users/:userId
router.get('/:userId', getUserById)

// PUT /users/:userId
router.patch('/:userId', updateUser)

// DELETE /users/:userId
router.delete('/:userId', deleteUser)

module.exports = router;