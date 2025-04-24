import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../schemas/User.js"; // Adjust path if different

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found. Please register." });
    }

    const password_match = await bcrypt.compare(password, user.password);
    if (!password_match) {
      return res.status(401).json({ message: "Password doesn't match" });
    }

    const payload = { _id: user._id, username: user.username };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30m" });

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
