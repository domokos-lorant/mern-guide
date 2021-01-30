import { NextApiRequest, NextApiResponse } from "next";
import Cart from "../../models/Cart";
import { verifyToken } from "../../utils/auth";
import connectDb from "../../utils/connectDb";

connectDb("cart");

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (!req.headers.authorization) {
        return res.status(401).send("No authorization token");
    }

    try {
        const userId = verifyToken(req.headers.authorization);
        const cart = await Cart
            .findOne({ user: userId })
            .populate({ path: "products.product", model: "Product" });
        res.status(200).json(cart?.products);
    } catch (error) {
        console.error(error);
        res.status(403).send("Please login again");
    }
}