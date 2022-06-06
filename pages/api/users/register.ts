import nc from "next-connect";
import { hashSync } from "bcryptjs"
import { signToken } from "../../../utils/auth";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";


const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
    const { userName, email, password } = req.body;

    const userData: Prisma.usersCreateInput = {
        userName,
        email,
        password: hashSync(password),
    }
    await prisma.$connect();

    const existingUserName = await prisma.users.findFirst({
        where: {
            userName: userName
        }
    });

    const existingUserEmail = await prisma.users.findFirst({
        where: {
            email: email

        }
    });
    await prisma.$disconnect();


    if (existingUserName) {
        res.status(409).send({
            msg: "Username taken"
        })
    } else if (existingUserEmail) {
        res.status(409).send({
            msg: "Email taken"
        })
    } else {
        await prisma.$connect();
        const newUser = await prisma.users.create({
            data: userData
        })
        await prisma.$disconnect();


        const token = signToken(newUser);

        res.send({
            token,
            id: newUser.id,
            userName: newUser.userName,
            email: newUser.email,
            isLoggedIn: true
        })
    }

})

export default handler;