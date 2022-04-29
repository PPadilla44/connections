import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const prisma = new PrismaClient();

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {

    const { users, levels, id } = req.query;

    const score = await prisma.scores.findFirst({
        where: {
            id: parseInt(id as string)
        },
        include: {
            users: users === "true" ? true : false,
            levels: levels === "true" ? true : false
        }
    });

    res.send(score)
});

handler.delete(async (req, res) => {

    const { id } = req.query;


    const score = await prisma.scores.findFirst({
        where: {
            id: parseInt(id as string)
        }
    });

    if (score) {
        await prisma.scores.delete({
            where: {
                id: parseInt(id as string)
            }
        });
        res.send({ msg: 'Score Deleted' })
    } else {
        res.status(404).send({ msg: "Score Not Found" })
    }

})

export default handler;