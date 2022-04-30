import { NextApiRequest, NextApiResponse } from "next";

const getError = (err: any) =>
    err.response && err.response.data && err.response.data.msg
        ? err.response.data.msg
        : err.msg;

const onError = async (
    err: any,
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    res.status(500).send({ msg: err.toString() });
};

export { getError, onError };