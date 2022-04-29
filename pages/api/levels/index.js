import nc from "next-connect";
import bcrpyt from "bcryptjs"
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const handler = nc();

handler.get(async (req, res) => {

    const { score, dot } = req.query;

    const allLevels = await prisma.level.findMany({
        include: {
            Score: score === "true" ? true : false,
            Dot: dot === "true" ? true : false
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

    const createdLevel = await prisma.level.create({
        data: {
            name,
            difficulty: parseInt(difficulty),
            linesToWin: parseInt(linesToWin)
        }
    });
    console.log(createdLevel);
    res.send(createdLevel);
})

export default handler;