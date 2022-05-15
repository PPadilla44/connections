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

    if (existingUserName) {
        res.status(409).send({
            msg: "Username taken"
        })
    } else if (existingUserEmail) {
        res.status(409).send({
            msg: "Email taken"
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