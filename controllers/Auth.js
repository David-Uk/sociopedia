import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
    } = req.body;
    const picturePath = req.file.path;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { register, login };
