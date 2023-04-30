import { gql } from "@apollo/client";

export const GET_SELECTED_PROFILE = gql`
  query GetSelectedProfile {
    clientState @client {
      selectedLogin
      login
      avatarUrl
    }
  }
`;
