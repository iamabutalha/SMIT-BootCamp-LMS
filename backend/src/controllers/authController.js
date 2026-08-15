const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");

const login = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const identifier = (email || username || "").trim().toLowerCase();

  if (!identifier || !password) {
    return res.status(400).json({
      success: false,
      message: "Email/username and password are required"
    });
  }

  const admin = await Admin.findOne({ email: identifier }).select("+password");

  if (!admin || !admin.isActive) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  const valid = await admin.comparePassword(password);

  if (!valid) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  const token = generateToken(admin);

  res.json({
    success: true,
    data: {
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin"
      }
    }
  });
});

const me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: "admin"
    }
  });
});

const logout = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully"
  });
});

module.exports = { login, me, logout };
