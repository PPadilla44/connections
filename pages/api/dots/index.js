import nc from "next-connect";
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const handler = nc();

handler.get(async (req, res) => {

    const allDots = await prisma.dots.findMany();

    res.send(allDots)

})

// Creates many dots from array called data
handler.post(async (req, res) => {

    const { data } = req.body;

    const createdDotsCount = await prisma.dots.createMany({
        data
    });
    res.send(createdDotsCount);
})


export default handler;