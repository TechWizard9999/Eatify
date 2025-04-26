import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import allowRoles from '../middleware/roleMiddleware.js';
import {
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getInventoryItems,
} from '../controllers/Inventory.js';

const router = express.Router();

router.use(authMiddleware);
router.use(allowRoles(["grocery", "restaurant", "party"]));

router.post('/', addInventoryItem);

router.route('/:id')
  .put(updateInventoryItem)
  .delete(deleteInventoryItem);

router.get('/user', getInventoryItems);

export default router;
