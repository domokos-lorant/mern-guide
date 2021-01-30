import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import { verifyToken } from "../../utils/auth";

connectDb("account");

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (!req.headers.authorization) {
        return res.status(401).send("No authorization token");
    }

    try {
        const userId = verifyToken(req.headers.authorization);
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