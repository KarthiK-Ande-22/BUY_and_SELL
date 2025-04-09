import express from 'express';
import Cart from "../Database/cart.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        console.log(" iam trying to get cart items in cart.js");
        const cartItems = await Cart.find();
        console.log("cart items are", cartItems);
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});



router.delete('/delete/:id', async (req, res) => {
    try {
      console.log("I am trying to remove the cart item in the backend");

      const cartItem = await Cart.findById(req.params.id);
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      await cartItem.deleteOne();
      res.status(200).json({ message: 'Cart item removed' });
      console.log( `i removed from cart ${cartItem.name}`);
    } catch (error) {
      console.error('Error removing cart item:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  // update the placed orders status to 1
  router.put("/pending/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        console.log("i am trying to update the cart items");  
        const cartItems = await Cart.find({ buyer_id: userId, status: 0 });

        if (!cartItems.length) {
            return res.status(404).json({ message: "No pending orders found." });
        }

        for (let item of cartItems) {
            item.status = 1;
            item.otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
            await item.save();
        }

        res.json({ message: "updated...!!!!", cartItems });

    } catch (error) {
        console.error("Error updating cart items:", error);
        res.status(500).json({ error: "Error updating status" });
    }
});


export default router;
