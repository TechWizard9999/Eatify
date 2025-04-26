import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../schemas/User.js";

export const register = async (req,res) => {
  const { name, email, password, phone, role,location } = req.body;
  if(!name || !email || !password || !role) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const existingUser = await User.findOne({email});
  if(existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    phone,
    role,
    location
  });
  await newUser.save();
  return res.status(201).json({ message: "User created successfully", id: newUser._id });
};

export const login = async (req,res) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const existingUser = await User.findOne({email});
  if(!existingUser){
    return res.status(400).json({message:"Invalid email or password"});
  }
  const matching = await bcrypt.compare(password,existingUser.password);
  if(!matching){
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const jwt_token= jwt.sign({id:existingUser._id , role: existingUser.role},process.env.JWT_SECRET,{
    expiresIn: '100d'
  });
  res.json({
    message: "Login Successful",
    token: jwt_token,
    user: {
      id: existingUser._id,
      name: existingUser.name,
      role: existingUser.role,
      location: existingUser.location
    }
  });
}
