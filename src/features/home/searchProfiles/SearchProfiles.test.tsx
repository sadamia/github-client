import { ApolloProvider } from '@apollo/client'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import SearchUsers from './SearchProfiles'
import { client } from '../../../client'

it('Search button should be disabled for empty search criteria', async() => {
  render(
    <ApolloProvider client={client}>
      <SearchUsers gridArea='search' />
    </ApolloProvider>
  )

  const submit = screen.getByRole('submit')

  await waitFor(() => {
    expect(submit).toHaveAttribute('disabled');
  });

})

it('Search button should be enabled for any search criteria', async() => {
  render(
    <ApolloProvider client={client}>
      <SearchUsers gridArea='search' />
    </ApolloProvider>
  )

  const search = screen.getByRole('search')
  const submit = screen.getByRole('submit')

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