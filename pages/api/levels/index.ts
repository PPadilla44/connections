import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const prisma = new PrismaClient();

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {

    const { scores, dots } = req.query;

    const allLevels = await prisma.levels.findMany({
        include: {
            scores: scores === "true" ? true : false,
            dots: dots === "true" ? true : false
        }
    });

    res.send(allLevels)
});

handler.post(async (req, res) => {

    const {
        name,
        difficulty,
        linesToWin,
    } = req.body;

    const createdLevel = await prisma.levels.create({
        data: {
            name,
            difficulty: parseInt(difficulty),
            linesToWin: parseInt(linesToWin)
        }
    });

    res.send(createdLevel);
})

export default handler;