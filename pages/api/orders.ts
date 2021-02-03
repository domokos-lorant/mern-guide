import { NextApiRequest, NextApiResponse } from "next";
import Order from "../../models/Order";
import { verifyToken } from "../../utils/auth";
import connectDb from "../../utils/connectDb";

connectDb("orders");

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (!req.headers.authorization) {
        return res.status(401).send("No authorization token");
    }

    try {
        const userId = verifyToken(req.headers.authorization);
        const orders = await Order
            .find({ user: userId })
            .populate({
                path: "products.product",
                model: "Product"
            });
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(403).send("Please login again");
    }
}