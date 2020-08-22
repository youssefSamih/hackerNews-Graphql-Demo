const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const resolvers = {
    Query: {
        info: () => `This is the API of Hackernews Clone`,
        feed: async function(parent, args, context) {
            return context.prisma.link.findMany();
        }
    },
    Mutation: {
        post: function(parent, args, context) {
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description
                }
            });
            return newLink
        },
        // updateLink(parent, args) {
        //     const objIndex = links.findIndex(obj => obj.id === args.id);
        //     links[objIndex].url = args.url ? args.url : links[objIndex].url;
        //     links[objIndex].description = args.description ? args.description : links[objIndex].description;
        //     return links[objIndex];
        // },
        // deleteLink(parent, args) {
        //     const objIndex = links.findIndex(obj => obj.id === args.id);
        //     const link = links[objIndex];
        //     links.splice(objIndex, 1);
        //     return link;
        // }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        prisma
    }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));