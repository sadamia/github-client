import { useEffect } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Text } from "../../../components/text/Text";
import { Query } from '../../../generated/graphql';
import InfinitePagination from "../common/InfinitePagination";
import { RepositoryItem } from "./RepositoryItem";
import { ListWrapper } from "../common/ListWrapper";
import Grid from "../../../components/grid";
import Flex from "../../../components/flex/Flex";
import { OptimisticContainer } from "../common/OptimisticContainer";
import { LoadingContainer } from "../common/LoadingContainer";

const GET_REPOS_BY_LOGIN = gql`
query GetRepositories($login: String!, $first: Int!, $after: String, $before: String, $createdate: String!, $direction: String!) {
  user(login: $login) {
    repositories(
      first: $first,
      orderBy: { field: $createdate, direction: $direction },
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

const GET_SELECTED_LOGIN = gql`
  query getSelectedLogin {
    clientState @client {
      selectedLogin
      login
      selectedLogin
    }
  }
`;

export const RepositoryList = () => {
  const [loadRepositories, { called, loading, data, error, fetchMore }] = useLazyQuery<Query>(
    GET_REPOS_BY_LOGIN
  );
  const { data: queryClientResult } = useQuery(GET_SELECTED_LOGIN);
  const showInfinite = called && queryClientResult?.clientState.login && data?.user?.repositories?.edges?.length;

  useEffect(() => {
    if (queryClientResult?.clientState?.login) {
      loadRepositories({
        variables: {
          login: queryClientResult?.clientState?.selectedLogin.replace('@', ''),
          createdate: "UPDATED_AT",
          direction: "DESC",
          first: 50
        }
      });
    }
  }, [loadRepositories, queryClientResult])

  if (error) {
    return <Text>There seems to be a problem, please try to repeat your operation.</Text>;
  }

  return (
    <ListWrapper
      columns={
        <Grid
          css={{
            gridTemplateColumns: 'minmax(8rem, 1fr) minmax(3rem, 1fr) minmax(auto, 1fr)',
            '@sm': {
              gridTemplateColumns: 'minmax(12rem, 1fr) minmax(6rem, 1fr) minmax(4rem, 1fr) minmax(auto, 1fr)',
            },
            '@md': {
              gridTemplateColumns: 'minmax(12rem, 1fr) minmax(6rem, 1fr) minmax(8rem, 1fr) minmax(auto, 1fr)',
            },
            '@lg': {
              gridTemplateColumns: 'minmax(12rem, 1fr) minmax(12rem, 1fr) minmax(12rem, 1fr) minmax(auto, 1fr)',
            },
            width: '100%',
            gap: '1rem',
          }}>
          <Text variant="headings-title-default-bold" css={{ wordBreak: 'break-all' }}>Name</Text>
          <Text variant="headings-title-default-bold">Rating 👀</Text>
          <Text variant="headings-title-default-bold">Watchers ⭐</Text>
        </Grid>
      }
      infinitePagination={
        <>
          {showInfinite ? <InfinitePagination
            hasNextPage={!!data?.user?.repositories?.pageInfo?.hasNextPage}
            items={data?.user?.repositories?.edges}
            isNextPageLoading={loading}
            RowTemplate={RepositoryItem}
            loadNextPage={
              fetchMore({
                variables: {
                  after: data?.user?.repositories?.pageInfo?.endCursor,
                  login: queryClientResult?.clientState?.selectedLogin.replace('@', ''),
                  createdate: "UPDATED_AT",
                  direction: "DESC",
                  first: 50
                }
              })
            }
          /> : <>
            {!loading && !data && <OptimisticContainer message="You have not selected any profile yet." />}
            {loading && <LoadingContainer />}
          </>
          }
        </>
      }
      footer={
        <Flex css={{ gap: '0.25rem' }}>
          <Text variant="headings-title-default-bold">Total repositories</Text>
          <Text variant="headings-title-default-bold" css={{ fontWeight: '$regular' }}>
            {data?.user?.repositories?.totalCount}
          </Text>
        </Flex>
      }
      loading={loading}
    />
  );
}