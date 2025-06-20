const express = require('express');

// Users Controllers
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('./../controllers/userController');

const router = express.Router();

// Handling Users Routing
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
