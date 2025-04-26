import mongoose from "mongoose";

const roles = ['grocery', 'restaurant', 'ngo', 'user'];
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: roles,
    default: 'user',
  },
  phone: {
    type: String,
  },
  isverifiedNGO:{
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
  },
}, { 
  timestamps: true 
});

const User = mongoose.model("User", userSchema);

export default User;
