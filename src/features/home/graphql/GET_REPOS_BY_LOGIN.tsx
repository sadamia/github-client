import { gql } from "@apollo/client/core";

const GET_REPOS_BY_LOGIN = gql`
query GetRepositories($login: String!, $first: Int!, $after: String, $before: String, $orderBy: RepositoryOrder!) {
  user(login: $login) {
    repositories(
      first: $first,
      orderBy: $orderBy,
      after: $after,
      before: $before
    ) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            ... on Repository {
              name
              owner {
                login
              }
              id
              stargazers {
                totalCount
              }
              watchers {
                totalCount
              }
              updatedAt
            }
          }
        }
    }
  }
}
`;

export default GET_REPOS_BY_LOGIN;