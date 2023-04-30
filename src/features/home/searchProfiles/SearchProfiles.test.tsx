import { ApolloProvider } from '@apollo/client'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import SearchProfiles from './SearchProfiles'
import { client } from '../../../client'

it('Search button should be disabled for empty search criteria', async() => {
  render(
    <ApolloProvider client={client}>
      <SearchProfiles gridArea='search' />
    </ApolloProvider>
  )

  const search = screen.getByTestId('search-button')
  
  await waitFor(() => {
    expect(search).toBeDisabled();
  });

})

it('Search button should be enabled for any search criteria', async() => {
  render(
    <ApolloProvider client={client}>
      <SearchProfiles gridArea='search' />
    </ApolloProvider>
  )

  const search = screen.getByRole('search')
  const submit = screen.getByTestId('search-button')

  await waitFor(() => {
    expect(submit).toHaveAttribute('disabled');
  });
  fireEvent.change(search, {
    target: { value: 'kent' },
  })
  
  await waitFor(() => {
    expect(submit).not.toBeDisabled();
  });

  fireEvent.click(submit) 
  expect(screen.getByRole('search')).toHaveValue('kent');

})