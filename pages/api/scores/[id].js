import nc from "next-connect";
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const handler = nc();

handler.get(async (req, res) => {

    const { users, levels } = req.query;

    const score = await prisma.scores.findFirst({
        where: {
            id: parseInt(req.query.id)
        },
        include: {
            users: users === "true" ? true : false,
            levels: levels === "true" ? true : false
        }
    });

    res.send(score)
});

handler.delete(async (req, res) => {

    const score = await prisma.scores.findFirst({
        where: {
            id: parseInt(req.query.id)
        }
    });

    if (score) {
        await prisma.scores.delete({
            where: {
                id: parseInt(req.query.id)
            }
        });
        res.send({ msg: 'Score Deleted' })
    } else {
        res.status(404).send({ msg: "Score Not Found" })
    }

})

export default handler;