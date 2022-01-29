import { clientStateVar } from "../../../cache";

export const clearClientStateVar = (loginValue?: string) => {
  clientStateVar({
    login: undefined,
    selectedLogin: undefined,
    owner: undefined,
    repository: undefined,
    repositoryId: undefined,
  })
};