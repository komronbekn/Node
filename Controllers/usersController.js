// Controllers/usersController.js
const User = require('../models/user');

const createUser = async (req, res) => {
    const { Name, Password, email } = req.body;

    if (!Name || !Password || !email) {
        return res.status(400).json({ message: 'Bad Request: Missing data' });
    }

    try {
        const newUser = new User({ Name, Password, email });
        await newUser.save();
        res.status(201).json({ data: newUser }); // Use 201 for resource creation
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ data: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: `User with id ${id} deleted successfully` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const EditUser = async (req, res) => {
    const { id } = req.params;
    const { Name, Password, email } = req.body; // Match the fields from the request

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { Name, Password, email }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Controllers/usersController.js

const loginUser = async (req, res) => {
    const { Name, Password } = req.body;

    if (!Name || !Password) {
        return res.status(400).json({ message: 'Bad Request: Missing data' });
    }

    try {
        const user = await User.findOne({ Name, Password }); // Username va parol bilan qidiring
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json(user); // Foydalanuvchini qaytaring
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createUser, getUsers, deleteUser, EditUser, loginUser };

