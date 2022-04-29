import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
    
    const { scores } = req.query;

    const allUsers = await prisma.users.findMany({
        include: {
            scores: scores === "true" ? true : false,
        },
    });

    res.send(allUsers);
});

export default handler;
