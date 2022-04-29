import { users } from "@prisma/client";
import jwt from "jsonwebtoken";

const signToken = (user: users) => {
    return jwt.sign(
        {
            id: user.id,
            userName: user.userName,
            email: user.email,
        },
        process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
        {
            expiresIn: "30d",
        }
    );
};

export { signToken };
