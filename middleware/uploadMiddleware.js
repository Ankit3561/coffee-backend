import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
});

// Filter for file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'), false);
    }
};

// Multer instance
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Max size: 5MB
    fileFilter,
});

export default upload;
