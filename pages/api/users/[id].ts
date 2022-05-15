import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import prisma from "../../../utils/db";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {

    const { scores, id } = req.query;

    const user = await prisma.users.findFirst({
        where: {
            id: parseInt(id as string)
        },
        include: {
            scores: scores === "true" ? true : false,
        }
    });

    res.send(user)
});

handler.delete(async (req, res) => {

    const { id } = req.query;

    const user = await prisma.users.findFirst({
        where: {
            id: parseInt(id as string)
        }
    });

    if (user) {
        await prisma.users.delete({
            where: {
                id: parseInt(id as string)
            }
        });
        res.send({ msg: 'User Deleted' })
    } else {
        res.status(404).send({ msg: "User Not Found" })
    }

})

export default handler;