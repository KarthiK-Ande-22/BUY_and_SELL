import express from 'express';
import Cart from "../Database/cart.js";

const router = express.Router();

router.get('/:userID', async (req, res) => {
    const { userID } = req.params;
    try {
        const my_orders = await Cart.find({ buyer_id: userID ,status: 2 });
        res.status(200).json(my_orders);
        console.log("my orders items  taken successfully");
        console.log("items..........:", my_orders);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Server Error' });
    }

});

export default router;