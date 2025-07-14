# Ultron Backend API Documentation

## Authentication APIs

This document outlines the API contracts for shipper and transporter authentication endpoints.

---

## Shipper APIs

### 1. Shipper Signup

Register a new shipper user in the system.

**Endpoint:** `/api/shippers/signup`

**Method:** `POST`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",        // Optional if mobileNumber is provided
  "mobileNumber": "9876543210",       // Optional if email is provided
  "password": "securepassword",       // Required
  "designation": "Logistics Manager", // Required
  "companyName": "ABC Logistics",     // Required
  "gstNumber": "27AAPFU0939F1ZV"      // Optional
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Shipper signed up successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "mobileNumber": "9876543210",
    "designation": "Logistics Manager",
    "companyName": "ABC Logistics",
    "gstNumber": "27AAPFU0939F1ZV",
    "createdAt": "2025-07-13T10:30:45.123Z",
    "updatedAt": "2025-07-13T10:30:45.123Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Password is required",
    "Email is already registered"
  ]
}
```

### 2. Shipper Login

Authenticate an existing shipper user.

**Endpoint:** `/api/shippers/login`

**Method:** `POST`

**Request Body:**
```json
{
  "email": "john@example.com",    // Either email or mobileNumber is required
  "mobileNumber": "9876543210",   // Optional if email is provided
  "password": "securepassword"    // Required
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": 1,
    "companyName": "ABC Logistics",
    "email": "john@example.com",
    "mobileNumber": "9876543210"
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 3. Shipper Registration (Complete Profile)

Register a shipper with complete company profile details.

**Endpoint:** `/api/shippers/register`

**Method:** `POST`

**Request Body:**
```json
{
  "companyName": "XYZ Logistics",       // Required
  "password": "securepassword",         // Required
  "email": "contact@xyzlogistics.com",  // Required
  "customerServiceNumber": "1800123456", // Optional
  "gstNumber": "27AAPFU0939F1ZV",       // Optional
  "cinNumber": "U72200KA2022PTC123456", // Optional
  "companyAddress": "123 Business Park, Bangalore", // Optional
  "ownerName": "Jane Smith",           // Optional
  "ownerContactNumber": "9876543210",   // Optional
  "serviceArea": "South India",         // Optional
  "pincode": "560001",                  // Optional
  "pocName": "Sam Johnson",             // Optional (Point of Contact)
  "pocEmail": "sam@xyzlogistics.com",   // Optional
  "pocDesignation": "Operations Head",  // Optional
  "pocContactNumber": "9876543211"      // Optional
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Shipper registered successfully",
  "data": {
    "id": 2,
    "companyName": "XYZ Logistics",
    "email": "contact@xyzlogistics.com",
    "customerServiceNumber": "1800123456",
    "gstNumber": "27AAPFU0939F1ZV",
    "cinNumber": "U72200KA2022PTC123456",
    "companyAddress": "123 Business Park, Bangalore",
    "ownerName": "Jane Smith",
    "ownerContactNumber": "9876543210",
    "serviceArea": "South India",
    "pincode": "560001",
    "pocName": "Sam Johnson",
    "pocEmail": "sam@xyzlogistics.com",
    "pocDesignation": "Operations Head",
    "pocContactNumber": "9876543211",
    "createdAt": "2025-07-13T11:15:30.456Z",
    "updatedAt": "2025-07-13T11:15:30.456Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "companyName, email, and password are required"
}
```

---

## Transporter APIs

### 1. Transporter Signup

Register a new transporter user in the system.

**Endpoint:** `/api/transporters/signup`

**Method:** `POST`

**Request Body:**
```json
{
  "name": "Alex Johnson",
  "email": "alex@transco.com",        // Optional if mobileNumber is provided
  "mobileNumber": "9876543212",       // Optional if email is provided
  "password": "securepassword",       // Required
  "designation": "Fleet Manager",     // Required
  "companyName": "TransCo Logistics", // Required
  "gstNumber": "27AAPFU0939F1ZV"      // Optional
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Transporter signed up successfully",
  "data": {
    "id": 1,
    "name": "Alex Johnson",
    "email": "alex@transco.com",
    "mobileNumber": "9876543212",
    "designation": "Fleet Manager",
    "companyName": "TransCo Logistics",
    "gstNumber": "27AAPFU0939F1ZV",
    "createdAt": "2025-07-13T14:20:15.789Z",
    "updatedAt": "2025-07-13T14:20:15.789Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Password is required",
    "Mobile number is already registered"
  ]
}
```

### 2. Transporter Login

Authenticate an existing transporter user.

**Endpoint:** `/api/transporters/login`

**Method:** `POST`

**Request Body:**
```json
{
  "email": "alex@transco.com",    // Either email or mobileNumber is required
  "mobileNumber": "9876543212",   // Optional if email is provided
  "password": "securepassword"    // Required
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": 1,
    "companyName": "TransCo Logistics",
    "email": "alex@transco.com",
    "mobileNumber": "9876543212"
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 3. Transporter Registration (Complete Profile)

Register a transporter with complete company profile details.

**Endpoint:** `/api/transporters/register`

**Method:** `POST`

**Request Body:**
```json
{
  "companyName": "SpeedyTruck Logistics", // Required
  "password": "securepassword",           // Required
  "email": "info@speedytruck.com",        // Required
  "customerServiceNumber": "1800123789",   // Optional
  "gstNumber": "27AAPFU0939F1ZV",         // Optional
  "companyAddress": "456 Transport Hub, Mumbai", // Optional
  "cinNumber": "U72200MH2021PTC789012",   // Optional
  "ownerName": "Michael Brown",           // Optional
  "ownerContactNumber": "9876543213",     // Optional
  "fleetCount": 25,                       // Optional
  "serviceArea": "Western India",         // Optional
  "pincode": "400001",                    // Optional
  "districtCityRates": {                  // Optional
    "Mumbai": {
      "rate": 1500,
      "perKm": 15
    },
    "Pune": {
      "rate": 2500,
      "perKm": 20
    }
  },
  "serviceType": ["FTL", "PTL"],           // Optional
  "etdDetails": {                         // Optional
    "Mumbai-Delhi": "48 hours",
    "Mumbai-Bangalore": "24 hours"
  }
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Transporter registered successfully",
  "data": {
    "id": 2,
    "companyName": "SpeedyTruck Logistics",
    "email": "info@speedytruck.com",
    "customerServiceNumber": "1800123789",
    "gstNumber": "27AAPFU0939F1ZV",
    "companyAddress": "456 Transport Hub, Mumbai",
    "cinNumber": "U72200MH2021PTC789012",
    "ownerName": "Michael Brown",
    "ownerContactNumber": "9876543213",
    "fleetCount": 25,
    "serviceArea": "Western India",
    "pincode": "400001",
    "districtCityRates": "{\"Mumbai\":{\"rate\":1500,\"perKm\":15},\"Pune\":{\"rate\":2500,\"perKm\":20}}",
    "serviceType": ["FTL", "PTL"],
    "etdDetails": "{\"Mumbai-Delhi\":\"48 hours\",\"Mumbai-Bangalore\":\"24 hours\"}",
    "createdAt": "2025-07-13T15:45:22.123Z",
    "updatedAt": "2025-07-13T15:45:22.123Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Missing required fields: companyName, password and email are required"
}
```

---

## Error Responses

All endpoints may return these common error responses:

**Server Error (500):**
```json
{
  "success": false,
  "message": "Error message description",
  "error": "Detailed error information"
}
```

**Unauthorized Access (401):**
```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

**Rate Limiting (429):**
```json
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
```
