const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify auth
  const { authorization } = req.headers;
  console.log("Authorization Header:", authorization); // Log the header

  if (!authorization) {
    console.log("Authorization header missing");
    return res.status(401).json({ error: "Authorization token required" });
  }

  const parts = authorization.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    console.log("Invalid authorization header format");
    return res
      .status(401)
      .json({ error: "Invalid authorization header format" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decoded);

    // Optional: Verify user existence
    try {
      const user = await User.findById(decoded.id);
      console.log("Decoded User ID:", decoded.id);
      if (!user) {
        console.log("User not found in database");
        return res.status(401).json({ error: "User not found" });
      }
      req.user = decoded; // or req.user = user; if you fetched from db.
      next();
    } catch (dbError) {
      console.error("Database error:", dbError);
      return res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.error("Authentication Error:", error);
    console.log("Token verification failed");
    console.log("Token:", token);
    console.log("Secret:", process.env.ACCESS_TOKEN_SECRET);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
