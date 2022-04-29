import nc from "next-connect";
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const handler = nc();

handler.get(async (req, res) => {

    const { scores, dots } = req.query;

    const level = await prisma.levels.findFirst({
        where: {
            id: parseInt(req.query.id)
        },
        include: {
            scores: scores === "true" ? true : false,
            dots: dots === "true" ? true : false
        }
    });

    res.send(level)
});

handler.delete(async (req, res) => {

    const level = await prisma.levels.findFirst({
        where: {
            id: parseInt(req.query.id)
        }
    });

    if (level) {
        await prisma.levels.delete({
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