import nc from "next-connect";
import bcrpyt from "bcryptjs"
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const handler = nc();

handler.get(async (req, res) => {

    const user = await prisma.user.findFirst({
        where: {
            id: parseInt(req.query.id)
        }
    });

    res.send(user)
});

handler.delete(async (req, res) => {

    const user = await prisma.user.findFirst({
        where: {
            id: parseInt(req.query.id)
        }
    });

    if (user) {
        await prisma.user.delete({
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