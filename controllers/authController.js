import Coffee from '../models/coffeeModel.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import nodemailer from 'nodemailer';
// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password, number } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ name, email, password, number });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                number: user.number,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// fshopee15@gmail.com
// ypyxjglbmmwxeoys
// Forgot password

// User_Email = "etestemail9815@gmail.com"
// User_Password = "lzxdtysoudajglhe"
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token (e.g., JWT or unique string)
        const resetToken = "123456"; // Replace with actual token generation logic

        // Create transport for sending emails
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "etestemail9815@gmail.com", // Your email
                pass: "lzxdtysoudajglhe", // Your email password
            },
        });

        // Send email
        const mailOptions = {
            from: "abc@gmail.com",
            to: email,
            subject: 'Password Reset Request',
            html: `<p>Hello,</p>
                   <p>You requested to reset your password. Please use the token below:</p>
                   <h3>${resetToken}</h3>
                   <p>If you did not request this, please ignore this email.</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Create Coffee
export const createCoffee = async (req, res) => {
    try {
        const { name, rating, price, description, containsMilk } = req.body; // Extract data from form-data

        const image = req.file ? req.file.filename : null; // File from Multer

        if (!name || !rating || !price || !containsMilk || !image) {
            return res.status(400).json({ message: 'All fields are required, including an image.' });
        }

        const coffee = new Coffee({
            name,
            rating: parseFloat(rating),
            price: parseFloat(price),
            description,
            containsMilk: containsMilk === 'true', // Convert string to boolean
            image,
            user: req.user._id, // User ID from token
        });

        const savedCoffee = await coffee.save();
        res.status(201).json(savedCoffee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Coffees
export const getCoffees = async (req, res) => {
    try {
        const coffees = await Coffee.find({ user: req.user._id });
        res.status(200).json(coffees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCoffees = async (req, res) => {
    try {
        const coffees = await Coffee.find();
        res.status(200).json(coffees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Update Coffee
export const updateCoffee = async (req, res) => {
    try {
        // console.log(req.params.id);
        const id = req.params.id; // Extract coffee ID from the query string

        if (!id) {
            return res.status(400).json({ message: 'Coffee ID is required.' });
        }

        const { name, rating, price, description, containsMilk } = req.body; // Extract other data from form-data
        const image = req.file ? req.file.filename : null; // Extract image from file upload

        // Find the coffee document by ID
        const coffee = await Coffee.findById({ _id: id });
        if (!coffee) {
            return res.status(404).json({ message: 'Coffee not found.' });
        }

        // Update fields if provided
        if (name) coffee.name = name;
        if (rating) coffee.rating = parseFloat(rating);
        if (price) coffee.price = parseFloat(price);
        if (description) coffee.description = description;
        if (containsMilk) coffee.containsMilk = containsMilk === 'true';
        if (image) coffee.image = image;

        // Save the updated coffee
        const updatedCoffee = await coffee.save(id, req.body);
        res.status(200).json(updatedCoffee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Coffee
export const deleteCoffee = async (req, res) => {

    const id = req.params.id;
    try {
        const coffee = await Coffee.findById({ _id: id });

        if (!coffee) {
            return res.status(400).json({ message: 'Coffee ID is required.' });
        }

        // if (Coffee.user.toString() !== req.user._id.toString()) {
        //     return res.status(401).json({ message: 'Not authorized to delete this coffee' });
        // }

        const result = await Coffee.deleteOne({ _id: id }); // Use a query object

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Coffee not found.' });
        }
        res.status(200).json({ message: 'Coffee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};