
import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clientState: {
          read() {
            return clientStateVar();
          }
        },
        search: relayStylePagination(),
        repository: relayStylePagination(),
      }
    },
    User: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        issues: relayStylePagination(),
      },
    },

  }
});

export interface ClientState {
  login?: string,
  selectedLogin?: string,
  repository?: string,
  owner?: string,
  repositoryId?: string,
  avatarUrl?: string,
}

const clientInitialValue: ClientState = {
  login: undefined,
  selectedLogin: undefined,
  repository: undefined,
  owner: undefined,
  repositoryId: undefined,
  avatarUrl: undefined
}

export const clientStateVar: ReactiveVar<ClientState> = makeVar<ClientState>(
  clientInitialValue
);
