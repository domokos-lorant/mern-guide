import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import { verifyToken } from "../../utils/auth";

connectDb("account");

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "PUT":
            await handlePutRequest(req, res);
            break;

        default:
            res.status(405).send(`Method ${req.method} not allowed.`);
            break;
    }
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse): Promise<void> {
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

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (!req.headers.authorization) {
        return res.status(401).send("No authorization token");
    }

    const { _id, role } = req.body;

    try {
        const userId = verifyToken(req.headers.authorization);
        const admin = await User.findById(userId);

        if (admin?.role !== "root") {
            res.status(405).send("Must be root to set permissions");
            return;
        }

        await User.findByIdAndUpdate(_id, { role });
        res.status(200).send("User updated");
    } catch (error) {
        console.error(error);
        res.status(403).send("Invalid token");
    }
}