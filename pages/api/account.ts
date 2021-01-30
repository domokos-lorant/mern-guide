import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../utils/connectDb";
import jwt from "jsonwebtoken";
import User from "../../models/User";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (!req.headers.authorization) {
        return res.status(401).send("No authorization token");
    }

    try {
        const tokenPayload = jwt.verify(req.headers.authorization || "", process.env.JWT_SECRET);
        const { userId } = tokenPayload as { userId: string };
        const user = await User.findOne({ _id: userId });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.status(403).send("Invalid token");
    }
}