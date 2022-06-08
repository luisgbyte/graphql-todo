import { ApolloServer } from 'apollo-server';

import typeDefs from './schema';
import resolvers from './resolvers';

import models, { sequelize } from './models';

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