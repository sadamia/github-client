import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react'
import ProfilesList from './ProfilesList'
import { client } from '../../../client'
import { clientStateVar } from '../../../cache'

  it('should display container with text for an empty search criteria', async() => {

    render(
      <ApolloProvider client={client}>
        <ProfilesList />
      </ApolloProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('You have not entered any @github profiles yet.')).toBeInTheDocument();
    });

  })

  it('should display loading state', async() => {

    render(
      <ApolloProvider client={client}>
        <ProfilesList />
      </ApolloProvider>
    )
    act(() => {
      clientStateVar({
        login: 'kent',
      })
    })
    await waitFor(() => {
      expect(screen.getByText('Loading ...')).toBeInTheDocument();
    })

  })
  it('should display profiles list for a given search criteria', async() => {
    const { debug, baseElement } = render(
      <ApolloProvider client={client}>
        <ProfilesList />
      </ApolloProvider>
    )
    clientStateVar({
      login: 'kent',
    })

    await waitFor(() => {
      expect(screen.getByTestId('profile-list')).toBeInTheDocument();
    });

  })
