import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { render, screen, waitFor, act, waitForElementToBeRemoved } from '@testing-library/react'
import { IssuesList } from './IssuesList'
import { client } from '../../../client'
import { clientStateVar } from '../../../cache'

it('Issues list should display empty container with text', async () => {

  render(
    <ApolloProvider client={client}>
      <IssuesList />
    </ApolloProvider>
  )

  await waitFor(() => {
    expect(screen.getByText('You have not selected any repository yet.')).toBeInTheDocument();
  });

})

it('Issues list should display loading state', async () => {
  render(
    <ApolloProvider client={client}>
      <IssuesList />
    </ApolloProvider>
  )
  act(() => {
    clientStateVar({
      repository: 'remix',
      owner: 'remix-run',
    })
  })
  await waitFor(() => {
    expect(screen.getByTestId('optimistic-container')).toBeInTheDocument();
  });

})
