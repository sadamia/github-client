import { Text } from "../../../components/text/Text";
import {
  IssueOrderField,
  OrderDirection,
} from "../../../generated/graphql";
import Button from "../../../components/button";
import { NewIssueDialog } from "../newIssue/NewIssueDialog";
import PlusIcon from "../../../icons/PlusIcon";
import Grid from "../../../components/grid";
import { ListWrapper } from "../common/ListWrapper";
import InfinitePagination from "../common/InfinitePagination";
import { IssueItem } from "./IssueItem";
import Flex from "../../../components/flex/Flex";
import { OptimisticContainer } from "../common/OptimisticContainer";
import { LoadingContainer } from "../common/LoadingContainer";
import useIssuesList from "./useIssuesList";

export const IssuesList = () => {
  const [
    queryClientResult,
    loading,
    data,
    error,
    showInfinite,
    fetchMore,
  ] = useIssuesList();

  if (error)
    return (
      <Text>
        There seems to be a problem, please try to repeat your operation.
      </Text>
    );

  return (
    <ListWrapper
      columns={
        <Flex direction="column" css={{ gap: "1rem", width: "$full" }}>
          <Text
            variant="headings-title-lg-bold-capitalized"
            css={{ fontWeight: 200 }}
          >
            Issues
          </Text>
          <Grid
            css={{
              gridTemplateColumns: "calc(100% - 8rem) 7rem",

              "@sm": {
                gridTemplateColumns: "calc(100% - 11rem) 10rem",
              },
              "@md": {
                gridTemplateColumns: "calc(100% - 10rem) minmax(auto, 1fr)",
              },
              width: "100%",
              gap: "1rem",
            }}
          >
            <Text
              variant="headings-title-default-bold"
              css={{ wordBreak: "break-all" }}
            >
              Title
            </Text>
            <Flex justify="end">
              <NewIssueDialog>
                <Button
                  size="default"
                  variant="secondary"
                  leftPart={<PlusIcon />}
                  isDisabled={!queryClientResult?.clientState?.repository}
                >
                  New Issue
                </Button>
              </NewIssueDialog>
            </Flex>
          </Grid>
        </Flex>
      }
      infinitePagination={
        <>
          {showInfinite ? (
            <InfinitePagination
              hasNextPage={!!data?.repository?.issues?.pageInfo?.hasNextPage}
              items={data?.repository?.issues?.edges}
              RowTemplate={IssueItem}
              isNextPageLoading={loading}
              loadNextPage={() => {
                fetchMore({
                  variables: {
                    repository: queryClientResult?.clientState?.repository,
                    owner: queryClientResult?.clientState?.owner,
                    cursor: data?.repository?.issues?.pageInfo?.endCursor,
                    orderBy: {
                      field: IssueOrderField.UpdatedAt,
                      direction: OrderDirection.Desc,
                    },
                    first: 50,
                  },
                });
              }}
            />
          ) : (
            <>
              {(!queryClientResult?.clientState?.login ||
                (!loading && !data)) && (
                <OptimisticContainer message="You have not selected any repository yet." />
              )}
              {loading && <LoadingContainer repeat={8} />}
            </>
          )}
        </>
      }
      footer={
        <Flex css={{ gap: "0.25rem" }}>
          <Text variant="headings-title-default-bold">Total issues</Text>
          <Text
            variant="headings-title-default-bold"
            css={{ fontWeight: "$regular" }}
          >
            {queryClientResult?.clientState?.login &&
              data?.repository?.issues?.totalCount}
          </Text>
        </Flex>
      }
    />
  );
};
