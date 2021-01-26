import { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/User";
import connectDb from "../../utils/connectDb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { name, email, password } = req.body;

    try {
        // 0. Validate name/email/password
        if (!isLength(name, { min: 3, max: 10 })) {
            return res.status(422).send("Name must be 3-10 characters long.");
        }

        if (!isLength(password, { min: 6 })) {
            return res.status(422).send("Password must be 6 characters long.");
        }

        if (!isEmail(email)) {
            return res.status(422).send("Email must be valid.");
        }

        // 1. Check if used exists already
        const user = await User.findOne({ email });

        if (user) {
            return res.status(422).send(`User already exists with ${email}`);
        }

        // 2. if not, hash their password
        const hash = await bcrypt.hash(password, 10);

        // 3. create user
        const newUser = await new User({
            name,
            email,
            password: hash
        }).save();
        console.log({ newUser });

        // 4. create token for new user
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" });

        // 5. send back token
        res.status(201).json(token);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error signing up user. Please try again later.");
    }
}