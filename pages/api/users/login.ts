import nc from "next-connect";
import bcrpyt from "bcryptjs"
import { signToken } from "../../../utils/auth";
import prisma from "../../../utils/db";
import { NextApiRequest, NextApiResponse } from "next";


const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {

    const { login, password } = req.body;

    await prisma.$connect();
    const user = await prisma.users.findFirst({
        where: {
            OR: [
                { userName: login },
                { email: login }
            ],
        }
    })
    await prisma.$disconnect();

    if (user && bcrpyt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.send({
            token,
            id: user.id,
            userName: user.userName,
            email: user.email,
            isLoggedIn: true
        });
    } else {
        res.status(401).send({ msg: 'Invalid email or password' })
    }
})

export default handler;