import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(200).json(product);
}