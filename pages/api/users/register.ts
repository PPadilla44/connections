import nc from "next-connect";
import { hashSync } from "bcryptjs"
import { signToken } from "../../../utils/auth";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
    const { userName, email, password } = req.body;

    const userData: Prisma.usersCreateInput = {
        userName,
        email,
        password: hashSync(password),
    }

    const existingUser = await prisma.users.findFirst({
        where: {
            OR: [
                { userName: userName },
                { email: email }
            ],
        }
    })
    if (existingUser) {

        res.status(409).send({
            msg: "User already exists"
        })

    } else {

        const newUser = await prisma.users.create({
            data: userData
        })

        const token = signToken(newUser);

        res.send({
            token,
            id: newUser.id,
            userName: newUser.userName,
            email: newUser.email,
        })
    }

})

export default handler;