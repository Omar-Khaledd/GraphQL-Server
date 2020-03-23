const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const {getData} = require('./helpers');

const typeDefs = gql`
  type User {
    given_name:     String!
    family_name:  String!
  }
  type Query {
    getUser(auth0Id: String!): User
  }
`;

// replace with actual REST endpoint

const restAPIEndpoint = 'https://cqm-test.auth0.com/api/v2';
const resolvers = {
    Query: {
        getUser: async (_, { auth0Id }) => {
            return await getData('https://cqm-test.auth0.com/api/v2' + '/users/' + auth0Id);
        }
    }
};

const schema = new ApolloServer({ typeDefs, resolvers });

schema.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`schema ready at ${url}`);
});
