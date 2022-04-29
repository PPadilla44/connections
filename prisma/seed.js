const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient()

async function main() {

    await prisma.user.deleteMany();

    const users = await prisma.user.createMany({
        data: [
            {
                email: 'john@example.com',
                userName: 'john',
                password: bcrypt.hashSync("123456"),

            },
            {
                email: 'alice@example.com',
                userName: 'alice',
                password: bcrypt.hashSync("123456"),
            },
        ]
    })

    console.log(users);

}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })