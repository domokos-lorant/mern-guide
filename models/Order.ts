import mongoose, { model, Model, Schema, Document } from "mongoose";
import { IProduct } from "./Product";
import { IUser } from "./User";

// Ensure related models are registerd, so that populate will work.
require("./User");
require("./Product");

const { ObjectId, Number, String } = Schema.Types;

const OrderSchema = new Schema({
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
    }],
    email: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export type IOrderItem = {
    quantity: number,
    product: IProduct
}

export interface IOrder {
    _id: any,
    user: Schema.Types.ObjectId | IUser,
    products: { product: mongoose.Types.ObjectId }[] | IOrderItem[];
    email: string;
    total: number;
    createdAt: Date;
}

export interface IOrderBaseDocument extends IOrder, Document { }

export interface ICartDocument extends IOrderBaseDocument {
    user: IUser["_id"],
    products: { product: mongoose.Types.ObjectId }[]
}

export interface IOrderPopulatedDocument extends IOrderBaseDocument {
    user: IUser
    products: IOrderItem[]
}

const Order: Model<ICartDocument> = mongoose.models.Order
    || model<ICartDocument>("Order", OrderSchema);
export default Order;