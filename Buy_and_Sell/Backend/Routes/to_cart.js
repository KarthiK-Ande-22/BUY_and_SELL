import express from 'express';
import Cart from "../Database/cart.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, price, category, description, quantity, buyer_id, seller_id, status,otp } = req.body;

        if (!name || !price || !category || !buyer_id || !seller_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // const already_there = await Cart.findOne({ name, buyer_id, seller_id });

        // if (already_there) {
        //     already_there.quantity += 1;
        //     await already_there.save();
        //     console.log("Quantity updated in cart");
        //     return res.status(200).json({ message: 'Cart item quantity updated', cartItem: already_there }); 
        // }

        console.log(" iam trying to Add to cart in to_cart.js");
        const newCartItem = new Cart({
            name,
            price,
            category,
            description,
            quantity: quantity || 1, 
            buyer_id,
            seller_id,
            status: status || 0, 
            otp:otp || -1,
        });
        console.log(" iam trying to save into cart");
        await newCartItem.save();

        res.status(201).json({ message: 'Item added to cart', cartItem: newCartItem });

    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
