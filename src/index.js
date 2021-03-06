const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require('@prisma/client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const { PubSub } = require('graphql-yoga');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote');

const prisma = new PrismaClient();
const pubsub = new PubSub();
const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: function(request) {
        return {
            ...request,
            prisma,
            pubsub
        }
    }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));

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