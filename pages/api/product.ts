import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;

    default:
      res.status(405).send(`Method ${req.method} not allowed.`);
      break;
  }
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(200).json(product);
}

async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { _id } = req.query;
  await Product.findOneAndDelete({ _id });
  res.status(204).json({});
}