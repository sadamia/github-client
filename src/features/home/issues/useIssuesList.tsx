import { useEffect } from "react";
import {
  IssueOrderField,
  OrderDirection,
  useGetIssuesLazyQuery,
  useGetRepositoryAndOwnerQuery,
} from "../../../generated/graphql";

const useIssuesList = () => {
  const { data: queryClientResult } = useGetRepositoryAndOwnerQuery();
  const [loadIssues, { called, loading, data, error, fetchMore }] =
    useGetIssuesLazyQuery();

  const showInfinite =
    called &&
    queryClientResult?.clientState?.login &&
    data?.repository?.issues?.edges?.length;

  useEffect(() => {
    if (
      queryClientResult?.clientState?.repository &&
      queryClientResult?.clientState?.owner
    ) {
      loadIssues({
        variables: {
          repository: queryClientResult?.clientState?.repository,
          owner: queryClientResult?.clientState?.owner,
          orderBy: {
            field: IssueOrderField.UpdatedAt,
            direction: OrderDirection.Desc,
          },
          first: 50,
        },
        fetchPolicy: "cache-and-network",
      });
    }
  }, [
    loadIssues,
    queryClientResult?.clientState?.owner,
    queryClientResult?.clientState?.repository,
  ]);

  return [
    queryClientResult,
    loading,
    data,
    error,
    showInfinite,
    fetchMore,
  ] as const;
};

export default useIssuesList;
