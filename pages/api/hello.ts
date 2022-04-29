import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get((req, res) => {
  res.send({ msg: "success" })
})

export default handler;