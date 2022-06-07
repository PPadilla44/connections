import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import prisma from "../../../utils/db";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {

    const { users, levels } = req.query;

    await prisma.$connect();
    const allScores = await prisma.scores.findMany({
        include: {
            users: users === "true" ? true : false,
            levels: levels === "true" ? true : false
        }
    });
    await prisma.$disconnect();

    res.send(allScores)
});

handler.post(async (req, res) => {

    const {
        time,
        userId,
        levelId,
    } = req.body;
    await prisma.$connect();
    const createdScore = await prisma.scores.create({
        data: {
            time,
            userId: parseInt(userId),
            levelId: parseInt(levelId),
        }
    });
    await prisma.$disconnect();
    res.send(createdScore);
})

export default handler;