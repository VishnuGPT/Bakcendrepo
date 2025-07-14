const { Shipper } = require('../models');
const jwt = require('jsonwebtoken');

// Validation function for shipper signup
const validateShipperSignup = async (req) => {
  console.log('Validating shipper signup input:', req.body);

  // Initialize an array to hold validation errors
  const errors = [];
  const {
    name,
    email,
    mobileNumber,
    password,
    designation,
    companyName,
    gstNumber
  } = req.body;

  // Validate required fields
  if (!password) {
    errors.push('Password is required');
  }
  if (!companyName) errors.push('Company name is required');
  if (!designation) errors.push('Designation is required');
  if (!name) errors.push('Name is required');

  // Validate that either email or mobileNumber is provided
  if (!email && !mobileNumber) {
    console.log('Validation error: Either email or mobile number must be provided');
    errors.push('Either email or mobile number must be provided');
  }

  // Validate GST number format (basic validation)
  if (gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstNumber)) {
    console.log('Validation error: Invalid GST number format');
    errors.push('Invalid GST number format');
  }

  // Check if email or mobileNumber already exists
  if (email) {
    const existingEmail = await Shipper.findOne({ where: { email } });
    if (existingEmail) errors.push('Email is already registered');
  }

  if (mobileNumber) {
    const existingMobile = await Shipper.findOne({ where: { mobileNumber } });
    if (existingMobile) errors.push('Mobile number is already registered');
  }

  console.log('Validation errors:', errors);
  return errors;
};

// Controller for shipper signup
exports.signupShipper = async (req, res) => {
  try {
    console.log('Received shipper signup request:', req.body);

    // Validate input data
    const validationErrors = await validateShipperSignup(req);
    
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    console.log('Input validation passed');

    // Extract fields from request body
    const {
      name,
      email,
      mobileNumber,
      password,
      designation,
      companyName,
      gstNumber
    } = req.body;

    console.log('Creating shipper with secured password');
    
    // Create new shipper
    // Note: Password encryption is handled by the beforeCreate hook in the Shipper model
    const newShipper = await Shipper.create({
      name,
      email,
      mobileNumber,
      password, 
      designation,
      companyName,
      gstNumber
    });

    // Remove password from response
    const shipperData = newShipper.toJSON();
    delete shipperData.password;

    return res.status(201).json({
      success: true,
      message: 'Shipper signed up successfully',
      data: shipperData
    });
  } catch (error) {
    console.error('Error during shipper signup:', error);
    return res.status(500).json({
      success: false,
      message: 'Error during shipper signup',
      error: error.message
    });
  }
};

// Register a new shipper
exports.registerShipper = async (req, res) => {
  try {
    const {
      companyName,
      password,
      email,
      customerServiceNumber,
      gstNumber,
      cinNumber,
      companyAddress,
      ownerName,
      ownerContactNumber,
      serviceArea,
      pincode,
      pocName,
      pocEmail,
      pocDesignation,
      pocContactNumber,
    } = req.body;

    if (!companyName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'companyName, email, and password are required',
      });
    }

    const existing = await Shipper.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered',
      });
    }

    const newShipper = await Shipper.create({
      companyName,
      password,
      email,
      customerServiceNumber,
      gstNumber,
      cinNumber,
      companyAddress,
      ownerName,
      ownerContactNumber,
      serviceArea,
      pincode,
      pocName,
      pocEmail,
      pocDesignation,
      pocContactNumber,
    });

    const data = newShipper.toJSON();
    delete data.password;

    return res.status(201).json({
      success: true,
      message: 'Shipper registered successfully',
      data,
    });
  } catch (error) {
    console.error('Error registering shipper:', error);
    return res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message,
    });
  }
};

// Login existing shipper
exports.loginShipper = async (req, res) => {
  try {
    const { email, mobileNumber, password } = req.body;
    
    // Validate required fields - either email or mobileNumber must be provided
    if ((!email && !mobileNumber) || !password) {
      return res.status(400).json({
        success: false,
        message: 'Either email or mobile number, and password are required',
      });
    }

    // Find the shipper by email or mobileNumber
    let shipper;
    if (email) {
      shipper = await Shipper.findOne({ where: { email } });
    } else {
      shipper = await Shipper.findOne({ where: { mobileNumber } });
    }

    if (!shipper || !(await shipper.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({
      id: shipper.id,
      email: shipper.email,
      mobileNumber: shipper.mobileNumber,
      companyName: shipper.companyName,
      userType: 'shipper'
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        id: shipper.id,
        companyName: shipper.companyName,
        email: shipper.email,
        mobileNumber: shipper.mobileNumber
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message,
    });
  }
};

// Protected home route for shipper
exports.getHome = async (req, res) => {
  try {
    const shipper = req.shipper;  // set by protect middleware

    return res.status(200).json({
      success: true,
      message: 'Welcome to your dashboard',
      data: {
        id: shipper.id,
        companyName: shipper.companyName,
        email: shipper.email,
      },
    });
  } catch (error) {
    console.error('Error accessing home:', error);
    return res.status(500).json({
      success: false,
      message: 'Could not retrieve home data',
      error: error.message,
    });
  }
};
