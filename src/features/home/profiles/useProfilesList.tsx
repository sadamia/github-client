import { useEffect } from "react";
import {
  useGetLoginQuery,
  useGetUserByLoginLazyQuery,
} from "../../../generated/graphql";

const useIssuesList = () => {
  const [loadProfiles, { called, loading, data, fetchMore, error }] =
    useGetUserByLoginLazyQuery();
  const { data: queryClientResult } = useGetLoginQuery();

  useEffect(() => {
    if (queryClientResult?.clientState?.login) {
      loadProfiles({
        variables: { login: queryClientResult?.clientState?.login, first: 10 },
        fetchPolicy: "cache-and-network",
      });
    }
  }, [loadProfiles, queryClientResult?.clientState?.login]);

  return [queryClientResult, called, loading, data, error, fetchMore] as const;
};

export default useIssuesList;
