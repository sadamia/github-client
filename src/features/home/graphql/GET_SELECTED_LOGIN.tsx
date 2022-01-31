import { gql } from "@apollo/client";

export const GET_SELECTED_LOGIN = gql`
  query GetSelectedLogin {
    clientState @client {
      selectedLogin
      login
      avatarUrl
    }
  }
`;
