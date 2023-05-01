import { graphql } from "msw";
import { getUserByLoginMockedData } from "./mockedData/getUserByLoginMockedData";
import { getRepositoriesMockedData } from "./mockedData/getRepositoriesMockedData";
import { getIssuesMockedData } from "./mockedData/getIssuesMockedData";

export const handlers = [
  graphql.query("GetUserByLogin", (req, res, ctx) => {
    return res(
      ctx.data(getUserByLoginMockedData),
    );
  }),

  graphql.query("GetRepositories", (req, res, ctx) => {
    return res(
      ctx.data(getRepositoriesMockedData),
    );
  }),

  graphql.query("GetIssues", (req, res, ctx) => {
    return res(
      ctx.data(getIssuesMockedData),
    );
  }),

];