import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const prisma = new PrismaClient();

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {

    const allDots = await prisma.dots.findMany();

    res.send(allDots)
})

// Creates many dots from array called dots
handler.post(async (req, res) => {

    const { dots } = req.body;

    const createdDotsCount = await prisma.dots.createMany({
        data: dots
    });
    res.send(createdDotsCount);
})


export default handler;