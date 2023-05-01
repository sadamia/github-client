import { clientStateVar } from "../../../cache";

export const clearClientStateVar = () => {
  clientStateVar({
    login: undefined,
    selectedLogin: undefined,
    owner: undefined,
    repository: undefined,
    repositoryId: undefined,
  });
};