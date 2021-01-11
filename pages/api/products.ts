import { IncomingMessage, ServerResponse } from "http";
import connectDb from "../../utils/connectDb";
import Product from "../../models/Product";

connectDb();

export default async (_req: IncomingMessage, res: ServerResponse): Promise<void> => {
  const products = await Product.find();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(products));
}