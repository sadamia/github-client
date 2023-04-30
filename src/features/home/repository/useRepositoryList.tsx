import { useEffect } from "react";
import {
  OrderDirection,
  RepositoryOrderField,
  useGetRepositoriesLazyQuery,
  useGetSelectedLoginQuery,
} from "../../../generated/graphql";

const useRepositoryList = () => {
  const [loadRepositories, { called, loading, data, error, fetchMore }] =
    useGetRepositoriesLazyQuery();
  const { data: queryClientResult } = useGetSelectedLoginQuery();
  const showInfinite =
    called &&
    queryClientResult?.clientState.selectedLogin &&
    data?.user?.repositories?.edges?.length;

  useEffect(() => {
    if (queryClientResult?.clientState?.selectedLogin) {
      loadRepositories({
        variables: {
          login: queryClientResult?.clientState?.selectedLogin.replace("@", ""),
          orderBy: {
            field: RepositoryOrderField.UpdatedAt,
            direction: OrderDirection.Desc,
          },
          first: 50,
        },
      });
    }
  }, [loadRepositories, queryClientResult?.clientState?.selectedLogin]);

  return [queryClientResult, loading, data, error, showInfinite, fetchMore] as const;
};

export default useRepositoryList;
