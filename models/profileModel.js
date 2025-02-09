import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    image: {
        type: String, // Name of the image (e.g., profile.jpg)
        // required: true,
    },
    email: { type: String },
    number: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // Each coffee item is linked to a user
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
