const express = require('express');

// Tours Controllers
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody
} = require('./../controllers/tourController');

const router = express.Router();

// Param Middle-Ware
router.param('id', checkID);

// Handling Tour Routing
router.route('/').get(getAllTours).post(checkBody,createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
