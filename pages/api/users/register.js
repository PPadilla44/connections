import nc from "next-connect";
import bcrpyt from "bcryptjs"
import { signToken } from "../../../utils/auth";
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const handler = nc();

handler.post(async (req, res) => {
    const { userName, email, password } = req.body;

    const userData = {
        userName,
        email,
        password: bcrpyt.hashSync(password),
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { userName: userName },
                { email: email }
            ],
        }
    })

    if (existingUser) {

        res.send({
            msg: "user already exisyts"
        })

    } else {

        const newUser = await prisma.user.create({
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