const jwt = require('jsonwebtoken');
const { Transporter, Shipper } = require('../models');

// Middleware to protect routes - verifies JWT token
exports.protect = async (req, res, next) => {
  let token;
  
  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if(decoded.userType==='shipper'){
        req.shipper = await Shipper.findByPk(decoded.id, {
          attributes: { exclude: ['password'] }
        });
      }else if (decoded.userType==='transporter'){
      // Add transporter to request object (without password)
      req.transporter = await Transporter.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });
    }
    else {
      // Throw an explicit error if userType is invalid
      const err = new Error('Token corrupted: invalid userType');
      err.status = 401;
      throw err;
    }

      next();
    } catch (error) {
      console.error('Auth error:', error);
      res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    });
  }
};
