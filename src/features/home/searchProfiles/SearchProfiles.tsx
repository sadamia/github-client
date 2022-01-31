import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { clientStateVar } from "../../../cache";
import Button from "../../../components/button";
import Flex from "../../../components/flex/Flex";
import { SearchInput } from "./SearchInput";
import { GET_LOGIN } from "../graphql/GET_LOGIN";
import { clearClientStateVar } from "../graphql/mutations";


const SearchUsers = ({ gridArea }: { gridArea: string }) => {
  const {
    register,
    getValues,
    formState: { isValid },
    handleSubmit,
    setValue,
    control
  } = useForm<{ search: string }>({ mode: 'all' });

  const { data: queryClientResult } = useQuery(GET_LOGIN);

  useEffect(() => {
    setValue('search', queryClientResult?.clientState?.login);
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

  const clearClientState = () => {
    clearClientStateVar();
    setValue('search', '');
  }
  return (
    <Flex css={{ 
      position: 'sticky',
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
          gap: '0.5rem',
        }}>
          <SearchInput
            role="search"
            placeholder='Search users'
            validation={register("search", {
              required: true
            })}
            clearClientState={clearClientState}
            control={control}
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