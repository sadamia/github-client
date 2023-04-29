# Setup
### Install

```
nvm use v16.11.1
npm install
```

### Configure
Grab the `VITE_GITHUB_ACCESS_TOKEN`
```
cp .env.sample .env
``` 
Make sure to run `npm run generate:types` to introspect github API and genarate types.

### Run tests
```
npm run test
``` 

### Run app
```
npm run start
``` 


# Code structure

##  Styling
  The primitives are built levaraging variants API, by following this pattern:
  base css, variants, default variant, and compound variant.
  The margin of the primitives is zero, the primitives don't have media queries,
  the layout desiciions are made with parent containers.
## Types
  React primitives have a type safe signature, meaning the props are constrained by variants, tokens,
  and data types. 
##  State managment
  The client state is managed by Apollo's client only schema, the mutations are wired via reactive variables,
  the field level subscriptions are hooked via Apollo's client queries.
##  Form validation
  The form has it's own state and provides subscription and hook based mechanics.
  The form validation is wired in two different ways, via explicit strongly typed schema fashion,
  and also via inline validation meta data.
## Testing
  The tests verify that the components handle empty, loading and success states.
  **testing-library** is used to interect with app the same way as your users.
  **msw** provides mechanics to introspect the GraphQL requests and mock the data.

