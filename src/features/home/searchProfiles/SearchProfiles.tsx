import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { clientStateVar } from "../../../cache";
import Button from "../../../components/button";
import Flex from "../../../components/flex/Flex";
import { SearchInput } from "../../../components/input/SearchInput";
import { GET_SELECTED_LOGIN } from "../graphql/GET_SELECTED_LOGIN";


const SearchUsers = ({ gridArea }: { gridArea: string }) => {
  const {
    register,
    getValues,
    formState: { isValid },
    handleSubmit,
    setValue
  } = useForm({ mode: 'onChange' });

  const { data: queryClientResult } = useQuery(GET_SELECTED_LOGIN);

  useEffect(() => {
    if (queryClientResult?.clientState.login) {
      setValue('search', queryClientResult?.clientState?.login);
    }
  }, [setValue, queryClientResult?.clientState?.login])

  const onSearchHandler = () => {
    clientStateVar({
      selectedLogin: undefined,
      repository: undefined,
      owner: undefined,
      repositoryId: undefined,
      login: getValues('search'),
    });
  }

  return (
    <Flex css={{ 
      position: 'fixed',
      zIndex: '$1',
      width: '100%',
      background: 'white',
      top: '0',
      padding: '1rem 0 1rem 0',
      boxShadow: '0 5px 5px -5px rgba(21, 29, 34, 0.08)',
      borderBottom: '1px solid #e2e8f0',
      maxWidth: 'calc(100vw - 2.5rem)',
      gridArea: gridArea,
    }}>
      <form onSubmit={handleSubmit(onSearchHandler)}>
        <Flex css={{
          gap: '0.5rem'
        }}>
          <SearchInput
            role="search"
            placeholder='Search users...'
            validation={register("search", {
              required: true
            })}
          />
          <Button
            role="submit"
            variant="secondary"
            isDisabled={!isValid}
            onClick={onSearchHandler}
          >
            Search
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

export default SearchUsers;