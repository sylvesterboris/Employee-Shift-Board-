const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const shiftController = require('../controllers/shiftController');
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/auth');

// Auth
router.post('/login', authController.login);

// Employees
router.get('/employees', auth(), employeeController.getEmployees);

// Shifts
router.post('/shifts', auth('admin'), shiftController.createShift);
router.get('/shifts', auth(['admin', 'user']), shiftController.getShifts);

module.exports = router;
