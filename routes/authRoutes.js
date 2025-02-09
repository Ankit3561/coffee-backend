import express from 'express';
import { registerUser, loginUser, forgotPassword, createCoffee, getCoffees, updateCoffee, deleteCoffee, getAllCoffees } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { createProfile, getAllProfile, getProfile } from '../controllers/profileController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.post('/addCoffee', protect, upload.single('image'), createCoffee);
router.get('/getCoffee', protect, getCoffees);
router.get('/getAllCoffee', protect, getAllCoffees);
router.put('/update/:id', protect, upload.single('image'), updateCoffee);
router.delete('/delete/:id', protect, deleteCoffee);

router.post('/addProfile', protect, upload.single('image'), createProfile);
router.get('/getProfile', protect, getProfile);
router.get('/getAllProfile', protect, getAllProfile);






export default router;
