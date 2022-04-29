import nc from "next-connect";

const handler = nc();

handler.get((req, res) => {
  res.send({ msg: "success" })
})

export default handler;