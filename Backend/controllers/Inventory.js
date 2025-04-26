import Inventory from "../schemas/Inventory.js";

export const addInventoryItem = async (req, res) => {
    try{
        const newItem = await Inventory.create({
            ...req.body,
            owner: req.user.id
        });
        return res.status(201).json({
            message: "Inventory item added successfully",
            inventory: newItem
        }); 
    }
    catch(err){
        return res.status(500).json({
            message: "Error adding inventory item",
            error: err.message
        });
    }
};

export const getInventoryItems = async (req, res) => {
    try {
      const items = await Inventory.find({ owner: req.user.id })
        .populate("owner", "name location"); 
  
      res.json({
        message: "Inventory items fetched successfully",
        inventory: items
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error fetching inventory items",
        error: err.message
      });
    }
  };
  

export const updateInventoryItem = async (req, res) => {
    try{
        const item = await Inventory.findByIdAndUpdate({
            _id: req.params.id,
            owner: req.user.id
        }, req.body, 
        { new: true });
        if(!item){
            return res.status(404).json({
                message: "Inventory item not found"
            });
        }
        return res.status(200).json({
            message: "Inventory item updated successfully",
            inventory: item
        });
    }catch(err){
        return res.status(500).json({
            message: "Error updating inventory item",
            error: err.message
        });
    }
};

export const deleteInventoryItem = async (req, res) => {
    try{
        const deleteItem = await Inventory.findByIdAndDelete({
            _id: req.params.id,
            owner: req.user.id
        });
        if(!deleteItem){
            return res.status(404).json({
                message: "Inventory item not found"
            });
        }
        return res.status(200).json({
            message: "Inventory item deleted successfully",
            inventory: deleteItem
        });
    }catch(err){
        return res.status(500).json({
            message: "Error deleting inventory item",
            error: err.message
        });
    }
};

