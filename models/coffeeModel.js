import mongoose from 'mongoose';

const coffeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Name of the image (e.g., coffee.jpg)
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5, // Ratings should be between 1 and 5
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    containsMilk: {
        type: Boolean,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // Each coffee item is linked to a user
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});

const Coffee = mongoose.model('Coffee', coffeeSchema);

export default Coffee;
