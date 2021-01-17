import mongoose, { Schema, Document, model, Model } from "mongoose";
import shortid from "shortid";

const { String, Number } = Schema.Types;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sku: {
    type: String,
    unique: true,
    default: shortid.generate()
  },
  description: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  },
});

export interface IProduct {
  _id: any;
  name: string,
  price: number,
  description: string,
  sku: string,
  mediaUrl: string
};

export interface IProductDocument extends IProduct, Document {

}


const Product: Model<IProductDocument> = mongoose.models.Product || model<IProductDocument>("Product", ProductSchema);
export default Product;