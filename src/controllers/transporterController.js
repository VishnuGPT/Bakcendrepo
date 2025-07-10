const { Transporter } = require('../models');
const jwt = require('jsonwebtoken');

// Controller for transporter registration
exports.registerTransporter = async (req, res) => {
  try {
    // Extract necessary fields from request body
    const { 
      companyName, 
      password, 
      email, 
      customerServiceNumber, 
      gstNumber,
      companyAddress,
      cinNumber,
      ownerName,
      ownerContactNumber,
      fleetCount,
      serviceArea,
      pincode,
      districtCityRates,
      serviceType,
      etdDetails
    } = req.body;

    // Validate required fields
    if (!companyName || !password || !email) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields: companyName, password and email are required'
      });
    }

    // Check if the email is already registered
    const existingTransporter = await Transporter.findOne({
      where: { email }
    });

    if (existingTransporter) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered'
      });
    }

    // Create new transporter
    const newTransporter = await Transporter.create({
      companyName,
      password,
      email,
      customerServiceNumber,
      gstNumber,
      companyAddress,
      cinNumber,
      ownerName,
      ownerContactNumber,
      fleetCount,
      serviceArea,
      pincode,
      districtCityRates: districtCityRates ? JSON.stringify(districtCityRates) : null,
      serviceType,
      etdDetails: etdDetails ? JSON.stringify(etdDetails) : null
    });

    // Remove password from response
    const transporterData = newTransporter.toJSON();
    delete transporterData.password;

    return res.status(201).json({
      success: true,
      message: 'Transporter registered successfully',
      data: transporterData
    });
  } catch (error) {
    console.error('Error registering transporter:', error);
    return res.status(500).json({
      success: false,
      message: 'Error registering transporter',
      error: error.message
    });
  }
};

// Controller for transporter login
exports.loginTransporter = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find the transporter by email
    const transporter = await Transporter.findOne({
      where: { email }
    });

    // Check if transporter exists
    if (!transporter) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isPasswordValid = await transporter.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: transporter.id, email: transporter.email, companyName: transporter.companyName, userType: 'transporter' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return success with token
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        id: transporter.id,
        companyName: transporter.companyName,
        email: transporter.email
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
};

// Protected controller for home route
exports.getHome = async (req, res) => {
  try {
    // req.transporter is set by the auth middleware after token verification
    const transporter = req.transporter;
    
    return res.status(200).json({
      success: true,
      message: 'Welcome to the protected home route',
      data: {
        transporter: {
          id: transporter.id,
          companyName: transporter.companyName,
          email: transporter.email,
          // Include other fields as needed without sensitive information
        }
      }
    });
  } catch (error) {
    console.error('Error in home route:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving home data',
      error: error.message
    });
  }
};
