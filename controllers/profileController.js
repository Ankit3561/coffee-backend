import Profile from "../models/profileModel.js";

export const createProfile = async (req, res) => {
    try {
        const { name, lastName, email, number } = req.body; // Extract data from form-data

        const image = req.file ? req.file.filename : null; // File from Multer

        if (!name || !lastName || !email || !number || !image) {
            return res.status(400).json({ message: 'All fields are required, including an image.' });
        }

        const profile = new Profile({
            name,
            lastName,
            email,
            image,
            number,
            user: req.user._id,
        });

        const savedProfile = await profile.save();
        res.status(201).json(savedProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const profile = await Profile.find({ user: req.user._id });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllProfile = async (req, res) => {
    try {
        const profile = await Profile.find();
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};