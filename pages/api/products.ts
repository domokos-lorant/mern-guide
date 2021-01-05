import { IncomingMessage, ServerResponse } from "http";
import products from "../../static/products.json";
import connectDb from "../../utils/connectDb";

connectDb();

export default (_req: IncomingMessage, res: ServerResponse): void => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(products));
}