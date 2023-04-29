import {
  ApolloClient,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { cache } from './cache';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
      console.log(graphQLErrors);
  }

  if (networkError) {
      // handle network error
      console.log(networkError);
  }
});

const authLink = from([setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
    }
  }
}),
errorLink]);

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,

});