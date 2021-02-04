import { NextApiRequest, NextApiResponse } from "next";
import Cart from "../../models/Cart";
import { verifyToken } from "../../utils/auth";
import connectDb from "../../utils/connectDb";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types

connectDb("cart");

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "PUT":
            await handlePutRequest(req, res);
            break;
        case "DELETE":
            await handleDeleteRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
            break;
    }
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse): Promise<void> {
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

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (!req.headers.authorization) {
        return res.status(401).send("No authorization token");
    }

    try {
        const { quantity, productId } = req.body;

        // Get user cart based on user id
        const userId = verifyToken(req.headers.authorization);
        const cart = await Cart
            .findOne({ user: userId });

        // check if product already exists in cart
        const productExists = cart?.products.some(p => ObjectId(productId).equals(p.product));

        // if so, increment quantity
        if (productExists) {
            await Cart.findOneAndUpdate(
                { _id: cart?._id, "products.product": productId },
                { $inc: { "products.$.quantity": quantity } }
            );
        } else {
            // if not, add new product with quantity
            const newProduct = { quantity, product: productId };
            await Cart.findOneAndUpdate(
                { _id: cart?._id },
                { $addToSet: { products: newProduct } }
            );
        }

        res.status(200).send("Cart updated");
    } catch (error) {
        console.error(error);
        res.status(403).send("Please login again");
    }
}

async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (!req.headers.authorization) {
        return res.status(401).send("No authorization token");
    }

    try {
        const productId = req.query.productId as string;

        // Get user cart based on user id
        const userId = verifyToken(req.headers.authorization);
        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { products: { product: ObjectId(productId) } } },
            { new: true }
        ).populate({
            path: "products.product",
            model: "Product"
        });
        res.status(200).json(updatedCart?.products);
    } catch (error) {
        console.error(error);
        res.status(403).send("Please login again");
    }
}