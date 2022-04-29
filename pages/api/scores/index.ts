import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const prisma = new PrismaClient();

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {

    const { users, levels } = req.query;

    const allScores = await prisma.scores.findMany({
        include: {
            users: users === "true" ? true : false,
            levels: levels === "true" ? true : false
        }
    });

    res.send(allScores)
});

handler.post(async (req, res) => {

    const {
        time,
        userId,
        levelId,
    } = req.body;

    const createdScore = await prisma.scores.create({
        data: {
            time,
            userId: parseInt(userId),
            levelId: parseInt(levelId)
        }
    });
    res.send(createdScore);
})

export default handler;