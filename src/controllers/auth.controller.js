import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  try {
    console.log("BE received this data for signup:", req.body);
    //  Add 'avatarUrl' to the list of destructured properties
    const { firstName, lastName, email, password, avatarUrl } = req.body;

    // --- Check for required fields ---
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create a new user with the avatarUrl provided from the frontend
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      avatarUrl,
    });

    if (newUser) {
      const token = generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        avatarUrl: newUser.avatarUrl,
        accessToken: token,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in SignUp-User: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatarUrl: user.avatarUrl,
      accessToken: token,
    });
  } catch (error) {
    console.log("Error in login controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    // เคลียร์ Cookie ที่ชื่อ 'jwt'
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProfile = (req, res) => {
  try {
    // middleware 'protectRoute' ได้ทำงานและแนบ user มากับ request แล้ว
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getProfile controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
