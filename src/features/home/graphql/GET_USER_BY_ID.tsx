import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query GetUserByLogin($login: String!, $cursor: String, $first: Int!) { 
    search(query: $login, type: USER, first: $first, after: $cursor){
      userCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on User {
            id
            name
            login
            avatarUrl
          }
        }
      }
    }
  }
`;