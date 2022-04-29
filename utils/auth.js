import jwt from "jsonwebtoken";

const signToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            userName: user.name,
            email: user.email,
        },
        process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
        {
            expiresIn: "30d",
        }
    );
};

export { signToken };
