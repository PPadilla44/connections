import { levels, PrismaClient } from "@prisma/client";
import { Level } from "../types";

const db = new PrismaClient();

const covertDocToObj = (doc: any) => {
    return {
        ...doc,
        createdAt: doc.createdAt?.toString() as string,
        updatedAt: doc.updatedAt?.toString() as string,
    };
};

type diffOptions = {
    [key: number]: Level['difficulty']
}

const convertDifficulty = (diff: number): Level['difficulty'] => {
    const diffObj: diffOptions = {
        1: "Easy",
        2: "Medium",
        3: "Hard"
    }
    return diffObj[diff];
}

const convertLevel = (doc: levels): Level => {
    return {
        ...covertDocToObj(doc),
        difficulty: convertDifficulty(doc.difficulty)
    }
}

type diffOrderOptions = {
    [key: string]: {
        [key: string]: "asc" | "desc";
    };
};

const getPlayPageLevels = async (searchQuery: string, sort: string, orderDir: "asc" | "desc") => {

    const order: diffOrderOptions = {
        recent: {
            createdAt: orderDir,
        },
        // featured: {
        //   createdBy: "orderDir",
        // },
        alphabetical: {
            name: orderDir,
        },
        difficulty: {
            difficulty: orderDir,
        },
    };

    const orderBy = order.hasOwnProperty(sort) ? order[sort] : {};

    await db.$connect();
    const levelDocs = await db.levels.findMany({
        where: {
            name: {
                contains: searchQuery,
            },
        },
        orderBy,
        include: {
            users: {
                select: {
                    userName: true,
                    id: true,
                },
            },
            scores: {
                select: {
                    time: true,
                },
                orderBy: {
                    time: "asc",
                },
                take: 1,
            },
        },
    });
    await db.$disconnect();
    return levelDocs.map(convertLevel);
}

export default db;
export { covertDocToObj, convertLevel, getPlayPageLevels };