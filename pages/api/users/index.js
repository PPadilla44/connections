import nc from "next-connect";
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const handler = nc();

handler.get(async (req, res) => {

    const { scores } = req.query;

    const allUsers = await prisma.users.findMany({
        include: {
            scores: scores === "true" ? true : false,
        }
    });
    
    res.send(allUsers)
})

export default handler;