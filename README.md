# Apollo 2021

Movie app built with React, Apollo and GraphQL to study graphql client

## 1. To use client, define ApolloClient, resolvers with query at apollo.js

```typescript
// apollo.js
import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLikeMove: (_, { id, isLiked }, { cache }) => {
        cache.modify({
          id: `Movie:${id}`,
          fields: {
            isLiked: () => !isLiked,
          },
        });
      },
    },
  },
});

export default client;
```

## 2. Provide apollo client

```typescript
// index.js
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
```

## 3. To fetch data, useQuery

```typescript
// Detail.js
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;
const { loading, data, error } = useQuery(GET_MOVIE, {
  variables: { id: +id },
});
```

## 4. Add temporary local data (isLiked) and use with @client

```typescript
import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
...
```

```typescript
const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;
...
```

## 5. mutate local data with useMutation

```ts
// apollo.js
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLikeMove: (_, { id, isLiked }, { cache }) => {
        cache.modify({
          id: `Movie:${id}`,
          fields: {
            isLiked: () => !isLiked,
          },
        });
      },
    },
  },
});
```

```ts
// Movie.js
const LIKE_MOVIE = gql`
  mutation toggleLikeMove($id: Int!, $isLiked: Boolean!) {
    toggleLikeMove(id: $id, isLiked: $isLiked) @client
  }
`;
...
const [toggleLikeMove] = useMutation(LIKE_MOVIE, {
  variables: { id: +id, isLiked },
});
```

## 6. use styled with react

```typescript
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
```

## 7. Optional chaining (by st4, create-react-app) instead of ternary with null state

```typescript
data?.movie?.language;
```

## 8. To connect between Two graphql data (Home and Detail), we have to fetch id

: [Data Normalization](https://www.apollographql.com/docs/react/caching/cache-configuration/#data-normalization)
