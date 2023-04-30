import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { clientStateVar } from "../../../cache";
import Button from "../../../components/button";
import Flex from "../../../components/flex/Flex";
import { SearchInput } from "./SearchInput";
import { clearClientStateVar } from "../graphql/mutations";
import { useGetLoginQuery } from "../../../generated/graphql";


const SearchUsers = ({ gridArea }: { gridArea: string }) => {
  const {
    register,
    getValues,
    formState: { isValid },
    handleSubmit,
    setValue,
    control
  } = useForm<{ search: string }>({ mode: 'all' });

  const { data: queryClientResult } = useGetLoginQuery();

  useEffect(() => {
    setValue('search', queryClientResult?.clientState?.login);
  }, [setValue, queryClientResult?.clientState?.login])

  const search = useWatch({
    control,
    name: "search",
  });

  const onSearchHandler = () => {
    clientStateVar({
      login: getValues('search'),
      selectedLogin: undefined,
      repository: undefined,
      owner: undefined,
      repositoryId: undefined,
    });
  }

  const clearClientState = () => {
    clearClientStateVar();
    setValue('search', '', { shouldValidate: true });
  }

  const isDisabled = !isValid && !search;
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
            variant="secondary"
            data-testid="search-button"
            disabled={isDisabled}
          >
            Search
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

export default SearchUsers;
