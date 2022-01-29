import React, { useEffect } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Text } from "../../../components/text/Text"
import Button from "../../../components/button";
import { Profile } from "./Profile"
import { Maybe, Query, User } from "../../../generated/graphql"
import Flex from "../../../components/flex/Flex";
import { GET_SELECTED_LOGIN } from "../graphql/GET_SELECTED_LOGIN";
import { clientStateVar } from "../../../cache";
import Box from "../../../components/box";

const GET_USER_BY_ID = gql`
  query GetUserByLogin($login: String!, $cursor: String) { 
    search(query: $login, type: USER, first: 10, after: $cursor){
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

const OptimisticContainer = ({ css, children }: { css?: any, children: React.ReactNode}) => {
  return (
    <Flex direction="column" align="center" justify="center" css={{
      gap: '0.5rem',
      padding: '1rem',
      border: 'dashed 3px #e2e8f0',
      borderRadius: '8px',
      width: '100%',
      minHeight: '230px',
      minWidth: '160px',
      ...css
    }}>
      {children}
    </Flex>
  )
}


const EmptyProfilesList = () => {
  const mutate = (login: string) => {
    clientStateVar({
      login: login,
      owner: undefined,
      repository: undefined,
      selectedLogin: undefined
    })
  }

  return (
    <OptimisticContainer css={{
      maxWidth: '100%',
      '@xl': {
        maxWidth: '160px',
        justifyContent: 'start',
      }
    }}>
      <Box>
        <Text variant="body-sm">You have not entered any @github profiles yet.</Text>
      </Box>
      <Box>
        <Text variant="body-sm">
          Try for partial
        </Text>
        <Button
          variant="link"
          size="compact"
          onClick={() => mutate('kent')}
          css={{
            padding: '0 0.125rem',
            lineHeight: '$shorter',
          }}
        >
          kent
        </Button>
        <Text variant="body-sm"> and</Text>
        <Button
          variant="link"
          size="compact"
          onClick={() => mutate('@kentcdodds')}
          css={{
            padding: '0 0.125rem',
            lineHeight: '$shorter',
          }}
        >
          @kentcdodds
        </Button>
        <Text variant="body-sm"> for exact profile matches.</Text>
      </Box>
    </OptimisticContainer>
  )
}

const ProfilesList = () => {
  const [loadProfiles, { called, loading, data, fetchMore }] = useLazyQuery<Query>(
    GET_USER_BY_ID
  );
  const { data: queryClientResult } = useQuery(GET_SELECTED_LOGIN);

  useEffect(() => {
    if (queryClientResult?.clientState.login) {
      loadProfiles({ variables: { login: queryClientResult?.clientState?.login } });
    }
  }, [loadProfiles, queryClientResult])

  if (called && loading) {
    return <OptimisticContainer>
      <Flex justify="center" css={{ maWidth: '160px' }}>
        <Text variant="headings-title-default-bold">Loading ...</Text>
      </Flex>
    </OptimisticContainer>;
  }

  if (!data || !queryClientResult?.clientState.login) {
    return <EmptyProfilesList />;
  }

  if (data?.search.edges?.length === 0) {
    return <OptimisticContainer>
      <Text>This @github profile doesn't yet.</Text>
    </OptimisticContainer>
  }

  return (
    <Flex data-testid="profile-list" css={{
      gap: '0.5rem',
      flexFlow: 'row',
      '@xl': {
        flexFlow: 'column nowrap',
        maxHeight: `${230 * 3}px`,
      }
    }}>
      {queryClientResult?.clientState.login && data?.search.edges?.map((item, index) => (
        <Profile
          key={index}
          item={(item?.node as Maybe<User>)}
        />
      ))}
      {queryClientResult?.clientState.login && data?.search?.pageInfo.hasNextPage &&
        <Flex
          direction="column"
          align="center"
          justify="center"
          css={{
            width: '100%',
            padding: '1rem',
            borderRadius: '$8px',
            maxWidth: '10rem',
            gap: '0.5rem',
            minHeight: '190px',
            border: 'dashed 4px #e2e8f0',
            background: 'white',
          }}
        >
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  cursor: data?.search?.pageInfo.endCursor,
                  login: queryClientResult?.clientState?.login
                }
              })
            }
          >
            Load more
          </Button>
        </Flex>}
    </Flex>
  )
}

export default ProfilesList;