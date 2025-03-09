const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Payload:", decoded); // Log the full decoded payload
    const { id } = decoded;
    console.log("Extracted id:", id);
    // const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(
      "requireAuth ACCESS_TOKEN_SECRET:",
      process.env.ACCESS_TOKEN_SECRET,
    ); // Log the secret
    console.log(id);
    console.log(token);

    const user = await User.findOne({ _id: id }).select("_id");
    console.log(req.user);

    if (!user) {
      return res.status(401).json({ error: "User not found" }); // Return an error if user is not found
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
