import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
const cache = new InMemoryCache();
// const link = createHttpLink({
//   uri: "http://localhost:4000",
// });
const client = new ApolloClient({
  cache,
  uri: "http://localhost:4000",
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      likeMovie: (_, { id }, { cache }) => {
        cache.modify({
          id: `Movie:${id}`,
          fields: {
            isLiked: () => true,
          },
        });
      },
    },
  },
});

export default client;
