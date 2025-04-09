import express from 'express';
import Cart from "../Database/cart.js";

const router = express.Router();

router.get('/buyer/:userID', async (req, res) => {
    // As a buyer
    const { userID } = req.params;
    try {
        const pending = await Cart.find({ buyer_id: userID , status: 1 });
        res.status(200).json(pending);
        console.log("pending-orders items for buyer successfully");
        console.log("items..........:", pending);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/seller/:userID', async (req, res) => {

    const { userID } = req.params;
    try {
        const sold = await Cart.find({ seller_id: userID , status: 2 });
        res.status(200).json(sold);
        console.log("sold items for seller successfully");
        console.log("items..........:", sold);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;