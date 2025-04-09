    import express from "express";
    import Item from "../Database/item.js";

    const router = express.Router();

    router.get("/categories", async (req, res) => {
        try {

            // console.log("i am in search_items.js");
        const categories = await Item.distinct("category"); // Fetch distinct categories

        res.status(200).json(categories);
        } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
        }
    });


    router.get("/:category/:name", async (req, res) => {
        try {
            console.log(" i am trying to search products...");
            let { category, name } = req.params;

            let filter = {};
            if(name==="all" && category==="all"){
                filter = {};
            }
            else if(name==="all" && category!=="all"){
                filter.category = category;
            }
            else if(name!=="all" && category==="all"){
                filter.name = name;
            }
            else{
                filter.name = name;
                filter.category = category;
            }

            const items = await Item.find(filter);

            console.log("products found:", items);
            res.status(200).json(items);


        } catch (error) {
            console.error(" Error fetching items:", error);
            res.status(500).json({ message: "Server Error" });
        }
    });

    export default router;
