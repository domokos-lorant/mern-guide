import mongoose, { model, Model, Schema, Document } from "mongoose";

const { String } = Schema.Types;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin", "root"]
    }
}, {
    timestamps: true
});

export type UserType = "user" | "admin" | "root";

export interface IUser {
    _id: any,
    name: string;
    email: string;
    password: string;
    role: UserType;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserDocument extends IUser, Document { }

const User: Model<IUserDocument> = mongoose.models.User
    || model<IUserDocument>("User", UserSchema);
export default User;