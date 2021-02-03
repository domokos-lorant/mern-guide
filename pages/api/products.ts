import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../utils/connectDb";
import Product, { IProduct } from "../../models/Product";

connectDb("products");

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { page, size } = req.query;

  const pageNum = Number(page);
  const pageSize = Number(size);
  let products: IProduct[];
  const totalDocs = await Product.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);

  if (pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    const skips = pageSize * (pageNum - 1);
    products = await Product.find().skip(skips).limit(pageSize);
  }

  // Next.js way:
  res.status(200).json({ products, totalPages });
}