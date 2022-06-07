import { ApolloServer } from 'apollo-server';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import models, { sequelize } from './graphql/models';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
  }
});


// The `listen` method launches a web server.
sequelize.sync().then(async () => {
  server.listen().then(({ url }: any) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});