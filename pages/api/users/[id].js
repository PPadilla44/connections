import nc from "next-connect";
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const handler = nc();

handler.get(async (req, res) => {

    const { scores } = req.query;

    const user = await prisma.users.findFirst({
        where: {
            id: parseInt(req.query.id)
        },
        include: {
            scores: scores === "true" ? true : false,
        }
    });

    res.send(user)
});

handler.delete(async (req, res) => {

    const user = await prisma.users.findFirst({
        where: {
            id: parseInt(req.query.id)
        }
    });

    if (user) {
        await prisma.users.delete({
            where: {
                id: parseInt(req.query.id)
            }
        });
        res.send({ msg: 'User Deleted' })
    } else {
        res.status(404).send({ msg: "User Not Found" })
    }

})

export default handler;