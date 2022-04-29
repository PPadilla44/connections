import nc from "next-connect";
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const handler = nc();

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