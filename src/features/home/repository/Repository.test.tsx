import React from "react";
import { ApolloProvider } from "@apollo/client";
import { render, screen, waitFor, act } from "@testing-library/react";
import { RepositoryList } from "./RepositoryList";
import { client } from "../../../client";
import { clientStateVar } from "../../../cache";

it("Repolistory list should display empty container with text", async () => {

  render(
    <ApolloProvider client={client}>
      <RepositoryList />
    </ApolloProvider>
  );

  await waitFor(() => {
    expect(screen.getByText("You have not selected any profile yet.")).toBeInTheDocument();
  });

});

it("Repolistory list should display loading state", async () => {
  render(
    <ApolloProvider client={client}>
      <RepositoryList />
    </ApolloProvider>
  );
  act(() => {
    clientStateVar({
      login: "kent",
      selectedLogin: "kentcdodds",
    });
  });
  await waitFor(() => {
    expect(screen.getByTestId("optimistic-container")).toBeInTheDocument();
  });

});
it("Repolistory list should display list for a given selected @github", async () => {
  render(
    <ApolloProvider client={client}>
      <RepositoryList />
    </ApolloProvider>
  );
  act(() => {
    clientStateVar({
      login: "kent",
      selectedLogin: "kentcdodds",
    });
  });
  await waitFor(() => {
    expect(screen.getByTestId("infinite-pagination")?.firstChild?.firstChild?.childNodes.length).toEqual(11);
  });

});
