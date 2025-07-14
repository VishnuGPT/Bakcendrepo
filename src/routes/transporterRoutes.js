const express = require('express');
const transporterController = require('../controllers/transporterController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
// POST route for transporter registration
router.post('/register', transporterController.registerTransporter);

// POST route for transporter signup with simplified fields
router.post('/signup', transporterController.signupTransporter);

// POST route for transporter login
router.post('/login', transporterController.loginTransporter);

// Protected routes (requires authentication)
// GET route for protected home page
router.get('/home', protect, transporterController.getHome);

// GET route to fetch all transporters
router.get('/all', protect, transporterController.getAllTransporters);

module.exports = router;
