import { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/User";
import connectDb from "../../utils/connectDb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { email, password } = req.body;

    try {
        // 1. Check if user exists with email
        const user = await User.findOne({ email }).select("+password");

        // 2. othewise return error.
        if (!user) {
            return res.status(404).send("No user exists with that email.");
        }

        // 3. Check if user's password matches the on in db.
        const doPasswordsMatch = await bcrypt.compare(password, user.password);

        // 4. if so, generate a token
        if (doPasswordsMatch) {
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" });

            // 5. send that token to the client
            return res.status(200).json(token);
        } else {
            return res.status(401).send("Password does not match.");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error logging in user");
    }
}