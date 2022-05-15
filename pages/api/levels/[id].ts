import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import prisma from "../../../utils/db";


const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {

    const { scores, dots, id } = req.query;

    const level = await prisma.levels.findFirst({
        where: {
            id: parseInt(id as string)
        },
        include: {
            scores: scores === "true" ? true : false,
            dots: dots === "true" ? true : false
        }
    });

    res.send(level)
});

handler.delete(async (req, res) => {

    const { id } = req.query;

    const level = await prisma.levels.findFirst({
        where: {
            id: parseInt(id as string)
        }
    });

    if (level) {
        await prisma.levels.delete({
            where: {
                id: parseInt(id as string)
            }
        });
        res.send({ msg: 'Level Deleted' })
    } else {
        res.status(404).send({ msg: "Level Not Found" })
    }

})

export default handler;