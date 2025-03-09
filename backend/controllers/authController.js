const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { validateUsername } = require("../validateCredentials");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" },
  );
};

// const generateRefreshToken = (user) => {
//     return jwt.sign(
//         { id: user._id, role: user.role },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: '7d' }
//     );
// }
const reqAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ error: "Refresh token required" });

  try {
    const user = await User.findOne({ refreshToken: refreshToken });
    if (!user) return res.status(403).json({ error: "invalid refresh token" });

    jwt.verify(
      refreshToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user._id.toString() !== decoded.id) {
          return res.status(403).json({ error: "Invalid refresh token" });
        }
        const AccessToken = generateAccessToken(user);
        res.status(200).json({ AccessToken });
      },
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const register = async (req, res) => {
  const { username, password, email, phoneNumber } = req.body;

  // Validate username
  const usernameError = validateUsername(username);
  if (usernameError) {
    return res
      .status(usernameError.statusCode)
      .json({ error: usernameError.error });
  }

  if (!validator.isMobilePhone(phoneNumber, "any")) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }

  //validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Incorrect email format" });
  }

  // Validate password
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password not strong enough" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      phoneNumber,
    });
    await user.save();

    const accessToken = generateAccessToken(user);

    res.status(201).json({ email: user.email, accessToken });
  } catch (error) {
    console.error("Server Error:", error); // Debugging
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    /* const loginError = validateLogin(username, password);
        if (loginError) {
            return res.status(loginError.statusCode).json({ error: loginError.error })
        } */

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }
    const accessToken = generateAccessToken(user);
    // const refreshToken = generateRefreshToken(user);
    // user.refreshToken = refreshToken;
    // await user.save();

    res.status(200).json({
      email,
      accessToken: accessToken,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  register,
  login,
  reqAccessToken,
};
