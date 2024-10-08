// Routes/usersRouter.js
const express = require('express');
const router = express.Router();
const { createUser, getUsers, deleteUser, EditUser, loginUser } = require('../Controllers/usersController');

// Create a user
router.post('/', createUser);

// Get all users
router.get('/', getUsers);
router.get('/:id', getUsers);

// Login user
router.post('/login', loginUser); // Login yo'li qo'shildi

// Delete a user by ID
router.delete('/:id', deleteUser); // Ensure the ID is passed in the URL
router.put('/:id', EditUser); // Update a user by ID

module.exports = router;
