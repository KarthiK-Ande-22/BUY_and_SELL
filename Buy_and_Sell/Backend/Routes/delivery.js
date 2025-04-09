import express from 'express';
import Cart from "../Database/cart.js";

const router = express.Router();

router.get('/:sellerID', async (req, res) => {
    console.log(" iam trying to get cart items in cart.js");
    const id=req.params.sellerID;
    try {
        
        const solditems = await Cart.find({seller_id:id , status:1});
        console.log("cart items are", solditems);
        res.status(200).json(solditems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


router.put("/confirm/:id", async (req, res) => {
    const { id } = req.params;

    try {
        console.log("i am trying to update the cart items");
        const cartItem = await Cart.findById(id);

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cartItem.status = 2;
        await cartItem.save();

        res.json({ message: "updated...!!!!", cartItem });

        console.log("i confirmed delivery of ", cartItem.name);

    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;