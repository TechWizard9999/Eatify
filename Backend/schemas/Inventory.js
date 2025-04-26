import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
    default: "kg"
  },
  expiry: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["fresh", "expiring", "spoiled"],
    default: "fresh"
  },
  description: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    default: "general"
  }
}, { timestamps: true });

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
