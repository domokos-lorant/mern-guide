import mongoose, { model, Model, Schema, Document } from "mongoose";
import { IProduct } from "./Product";
import { IUser } from "./User";

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

export interface ICart {
    _id: any,
    user: Schema.Types.ObjectId | IUser,
    products: Schema.Types.ObjectId[] | IProduct[];
}

export interface ICartBaseDocument extends ICart, Document { }

export interface ICartDocument extends ICartBaseDocument {
    user: IUser["_id"],
    products: IProduct["_id"][]
}

export interface ICartPopulatedDocument extends ICartBaseDocument {
    user: IUser
    products: IProduct[]
}

const Cart: Model<ICartDocument> = mongoose.models.Cart
    || model<ICartDocument>("Cart", CartSchema);
export default Cart;