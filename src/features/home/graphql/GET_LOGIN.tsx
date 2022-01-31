import { gql } from "@apollo/client";

export const GET_LOGIN = gql`
  query GetLogin {
    clientState @client {
      login
    }
  }
`;
