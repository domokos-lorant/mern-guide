import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { verifyToken } from "../../utils/auth";
import Cart, { ICartPopulatedDocument } from "../../models/Cart";
import calculateCartTotal from "../../utils/calculateCartTotal";
import Order from "../../models/Order";
import connectDb from "../../utils/connectDb";

connectDb("Checkout");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2020-08-27" });

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (!req.headers.authorization) {
        return res.status(401).send("No authorization token");
    }

    const { paymentData } = req.body;

    try {
        // Verify and get user id from token
        const userId = verifyToken(req.headers.authorization);

        // Find cart based on user id, populate it
        const cart = (await Cart
            .findOne({ user: userId })
            .populate({
                path: "products.product",
                model: "Product"
            })) as unknown as ICartPopulatedDocument;

        // Calculate cart totls again from cart products
        const { cartTotal, stripeTotal } = calculateCartTotal(cart?.products);

        // Get email for payment data, see if email linked with 
        // existing Stripe customer
        const prevCustomer = await stripe.customers.list({
            email: paymentData.email,
            limit: 1
        });
        const isExistingCustomer = prevCustomer.data.length > 0;

        // If not existing customer, create them
        let customerId: string;

        if (!isExistingCustomer) {
            const newCustomer = await stripe.customers.create({
                email: paymentData.email,
                source: paymentData.id
            });
            customerId = newCustomer.id;
        } else {
            customerId = prevCustomer.data[0].id;
        }

        // Create a charge with total, send receipt email
        await stripe.charges.create({
            currency: "USD",
            amount: stripeTotal,
            customer: customerId,
            receipt_email: paymentData.email,
            description: `Checkout | ${paymentData.email} | ${paymentData.id}`
        }, {
            idempotencyKey: uuidv4()
        })

        // Add order data to db
        await new Order({
            user: userId,
            email: paymentData.email,
            total: cartTotal,
            products: cart.products
        }).save();

        // Clear products in cart
        await Cart.findOneAndUpdate(
            { _id: cart._id },
            { $set: { products: [] } }
        );

        // Send back success
        res.status(200).send("Checkout successful.")
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing charge");
    }
}