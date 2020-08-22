const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const newLink = await prisma.link.create({
        data: {
            description: 'Fullstack tutorial for GraphQL',
            url: 'www.howtographql.com',
        }
    });
    const allLinks = await prisma.link.findMany();
    console.log(allLinks);
}

main()
    .catch(function(e) {
        throw e;
    })
    .finally(async function() {
        await prisma.$disconnect();
    })