const express = require('express');

// Users Controllers
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require('../controllers/userController');

// Auth controllers
const {
  signUp,
  logIn,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require('../controllers/authController');

const router = express.Router();

// Handling signup routing
router.post('/signup', signUp);
router.post('/login', logIn);

// Handling forgot and reset password routing
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware
router.use(protect);

// Handling update-password routing
router.patch('/updateMyPassword', protect, updatePassword);

// handling getting user info
router.get('/me', getMe, getUser);

// Handling update-me (update current user data) routing
router.patch('/updateMe', updateMe);

// Handling delete-me (delete current user data) routing
router.delete('/deleteMe', deleteMe);

// Restricted Rotes accessed by admin
router.use(restrictTo('admin'));

// Handling Users Routing
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
