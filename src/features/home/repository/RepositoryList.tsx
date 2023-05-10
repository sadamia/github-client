import { Text } from "../../../components/text/Text";
import InfinitePagination from "../common/InfinitePagination";
import { RepositoryItem } from "./RepositoryItem";
import { ListWrapper } from "../common/ListWrapper";
import Grid from "../../../components/grid";
import Flex from "../../../components/flex/Flex";
import { OptimisticContainer } from "../common/OptimisticContainer";
import { LoadingContainer } from "../common/LoadingContainer";
import { Badge } from "../common/Badge";
import useRepositoryList from "./useRepositoryList";
import { RepositoryEdge, GetRepositoriesQuery } from "../../../generated/graphql";


export const RepositoryList = () => {
  const [queryClientResult, loading, data, error, showInfinite, fetchMore] =
    useRepositoryList();

  if (error) {
    return (
      <Text>
        There seems to be a problem, please try to repeat your operation.
      </Text>
    );
  }

  return (
    <ListWrapper
      columns={
        <Flex direction="column" css={{ gap: "1rem", width: "$full" }}>
          <Flex
            css={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              variant="headings-title-lg-bold-capitalized"
              css={{
                fontWeight: 200,
                fontSize: "$lg",
                "@sm": {
                  fontSize: "1.625rem",
                },
              }}
            >
              Repositories
            </Text>
            <Badge />
          </Flex>
          <Grid
            css={{
              gridTemplateColumns:
                "minmax(5rem, 1fr) minmax(3rem, 1fr) minmax(auto, 1fr)",
              "@sm": {
                gridTemplateColumns:
                  "minmax(12rem, 1fr) minmax(4rem, 1fr) minmax(4rem, 1fr) minmax(auto, 1fr)",
              },
              "@md": {
                gridTemplateColumns:
                  "minmax(12rem, 1fr) minmax(4rem, 1fr) minmax(8rem, 1fr) minmax(auto, 1fr)",
              },
              "@lg": {
                gridTemplateColumns:
                  "minmax(12rem, 1fr) minmax(8rem, 1fr) minmax(12rem, 1fr) minmax(auto, 1fr)",
              },
              width: "100%",
              gap: "1rem",
            }}
          >
            <Text variant="headings-title-default-bold">Name</Text>
            <Text variant="headings-title-default-bold">Rating</Text>
            <Text variant="headings-title-default-bold">Watchers</Text>
          </Grid>
        </Flex>
      }
      infinitePagination={
        <>
          {showInfinite ? (
            <InfinitePagination<RepositoryEdge>
              hasNextPage={!!data?.user?.repositories?.pageInfo?.hasNextPage}
              items={data?.user?.repositories?.edges as RepositoryEdge[]}
              isNextPageLoading={loading}
              RowTemplate={RepositoryItem}
              loadNextPage={() => {
                fetchMore({
                  variables: {
                    after: data?.user?.repositories?.pageInfo?.endCursor,
                    login:
                      queryClientResult?.clientState?.selectedLogin?.replace(
                        "@",
                        ""
                      ),
                    orderBy: {
                      field: "UPDATED_AT",
                      direction: "DESC",
                    },
                    first: 50,
                  },
                });
              }}
            />
          ) : (
            <>
              {loading && <LoadingContainer repeat={8} />}
              {!loading && !data && (
                <OptimisticContainer message="You have not selected any profile yet." />
              )}
            </>
          )}
        </>
      }
      footer={
        <Flex css={{ gap: "0.25rem" }}>
          <Text variant="headings-title-default-bold">Total repositories</Text>
          <Text
            variant="headings-title-default-bold"
            css={{ fontWeight: "$regular" }}
          >
            {showInfinite && data?.user?.repositories?.totalCount}
          </Text>
        </Flex>
      }
    />
  );
};
