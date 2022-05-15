import { hashSync } from "bcryptjs"
import prisma from "../utils/db"


async function main() {

    await prisma.users.deleteMany();

    await prisma.users.createMany({
        data: [
            {
                email: 'john@example.com',
                userName: 'john',
                password: hashSync("123456"),

            },
            {
                email: 'alice@example.com',
                userName: 'alice',
                password: hashSync("123456"),
            },
        ]
    })

    const seededUsers = await prisma.users.findMany();

    await prisma.levels.deleteMany();

    await prisma.levels.createMany({
        data: [
            {
                name: 'level1',
                difficulty: 1,
                linesToWin: 20,
                userId: seededUsers[0].id
            },
            {
                name: 'level2',
                difficulty: 2,
                linesToWin: 40,
                userId: seededUsers[1].id
            },
        ]
    })

    const seededLevels = await prisma.levels.findMany();

    await prisma.scores.deleteMany();

    await prisma.scores.createMany({
        data: [
            {
                time: "02:40.489",
                levelId: seededLevels[0].id,
                userId: seededUsers[0].id
            },
            {
                time: "12:04.365",
                levelId: seededLevels[1].id,
                userId: seededUsers[1].id
            }
        ]
    })


    await prisma.dots.deleteMany();

    await prisma.dots.createMany({
        data: [
            {
                levelId: seededLevels[0].id,
                x: 20,
                y: 20,
                sequence: 1
            },
            {
                levelId: seededLevels[0].id,
                x: 40,
                y: 40,
                sequence: 2
            },
        ]
    });

    console.log("SEED SUCCESSFULL")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })