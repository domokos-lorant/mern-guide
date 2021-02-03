import { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/User";
import { verifyToken } from "../../utils/auth";
import connectDb from "../../utils/connectDb";

connectDb("users");

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (!req.headers.authorization) {
        return res.status(401).send("No authorization token");
    }

    try {
        const userId = verifyToken(req.headers.authorization);
        const users = await User
            .find({ _id: { $ne: userId } });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(403).send("Please login again");
    }
}