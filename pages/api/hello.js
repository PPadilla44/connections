// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
export default async function handler(req, res) {
  try {
    const createdUSer = await prisma.user.create({
      data: {
        userName: "fasmish1",
        email: "famish1@gmail.com",
        password: "pass"
      }
    })
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers)
  } catch (err) {
    res.status(400).json({ MSG: "NO" })
  }
}
