import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../utils/connectDb";
import Product from "../../models/Product";

connectDb();

export default async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const products = await Product.find();

  // Node.js way:
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'application/json');
  // res.end(JSON.stringify(products));

  // Next.js way:
  res.status(200).json(products);
}