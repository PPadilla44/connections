import nc from "next-connect";
import bcrpyt from "bcryptjs"
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const handler = nc();

handler.get(async (req, res) => {

    const allUsers = await prisma.user.findMany();
    
    res.send(allUsers)
})

export default handler;