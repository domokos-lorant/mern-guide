import mongoose, { model, Model, Schema, Document } from "mongoose";
import { IProduct } from "./Product";
import { IUser } from "./User";

// Ensure related models are registerd, so that populate will work.
require("./User");
require("./Product");

const { ObjectId, Number } = Schema.Types;

const CartSchema = new Schema({
    user: {
        type: ObjectId,
        ref: "User"
    },
    products: [{
        quantity: {
            type: Number,
            default: 1
        },
        product: {
            type: ObjectId,
            ref: "Product"
        }
    }]
});

export type ICartItem = {
    quantity: number,
    product: IProduct
}

export interface ICart {
    _id: any,
    user: Schema.Types.ObjectId | IUser,
    products: { product: { _id: Schema.Types.ObjectId } }[] | ICartItem[];
}

export interface ICartBaseDocument extends ICart, Document { }

export interface ICartDocument extends ICartBaseDocument {
    user: IUser["_id"],
    products: { product: { _id: Schema.Types.ObjectId } }[]
}

export interface ICartPopulatedDocument extends ICartBaseDocument {
    user: IUser
    products: ICartItem[]
}

const Cart: Model<ICartDocument> = mongoose.models.Cart
    || model<ICartDocument>("Cart", CartSchema);
export default Cart;