import nc from "next-connect";
import bcrpyt from "bcryptjs"
import { signToken } from "../../../utils/auth";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {

    const { userName, email, password } = req.body;

    const user = await prisma.users.findFirst({
        where: {
            OR: [
                { userName: userName },
                { email: email }
            ],
        }
    })

    if (user && bcrpyt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.send({
            token,
            id: user.id,
            userName: user.userName,
            email: user.email,
        });
    } else {
        res.status(401).send({ message: 'Invalid email or password' })
    }
})

export default handler;