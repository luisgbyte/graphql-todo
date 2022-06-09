import { ApolloServer, AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

import 'dotenv/config';

import typeDefs from './schema';
import resolvers from './resolvers';

import models, { sequelize } from './models';

console.log(process.env.SECRET);

const getMe = async (req: any) => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, 'wr3r23fwfwefwekwself.2456342.dawqdq');
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req);

    return {
      models,
      me,
      secret: process.env.SECRET,
    };
  },
});


// The `listen` method launches a web server.
sequelize.sync().then(async () => {
  server.listen().then(({ url }: any) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});