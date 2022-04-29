import nc from "next-connect";
import bcrpyt from "bcryptjs"
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const handler = nc();

handler.get(async (req, res) => {

    const { score, dot } = req.query;

    const level = await prisma.level.findFirst({
        where: {
            id: parseInt(req.query.id)
        },
        include: {
            Score: score === "true" ? true : false,
            Dot: dot === "true" ? true : false
        }
    });

    res.send(level)
});

handler.delete(async (req, res) => {

    const level = await prisma.level.findFirst({
        where: {
            id: parseInt(req.query.id)
        }
    });

    if (level) {
        await prisma.level.delete({
            where: {
                id: parseInt(req.query.id)
            }
        });
        res.send({ msg: 'Level Deleted' })
    } else {
        res.status(404).send({ msg: "Level Not Found" })
    }

})

export default handler;