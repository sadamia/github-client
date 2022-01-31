import React from 'react';
import SearchIcon from '../../../icons/SearchIcon'
import Flex from '../../../components/flex/Flex';
import { Input, InputOwnProps } from '../../../components/input/Input'
import Box from '../../../components/box';
import Button from '../../../components/button';
import { Control, useWatch } from 'react-hook-form';

type SearchInputProps = InputOwnProps & {
  clearClientState: () => void
  control: Control<{
    search: string;
  }, object>
};

export const SearchInput = (props: SearchInputProps) => {

  const search = useWatch({
    control: props.control,
    name: "search", 
    defaultValue: ""
  });

  return (
    <Flex css={{
      position: 'relative',
      alignItems: 'center',
      gap: '0.5rem',
      minWidth: '11rem',
      '@sm': {
        minWidth: '16rem',
      }
    }}>
      <Box css={{
        position: 'absolute',
        left: '0.75rem'
      }} >
        <SearchIcon />
      </Box>
      <Input
        size="large"
        type={'text'}
        role={'search'}
        validation={props.validation}
        value={props.value}
        placeholder={props.placeholder}
      />
      {search.length > 0 && <Flex css={{
        position: 'absolute',
        right: '0.5rem',
        alignItems: 'center',
        top: "50%",
        transform: "translateY(-50%)",
        '& svg': {
          cursor: 'pointer',
          color: '$asphalt',
        }
      }} >
        <Button
          variant='link'
          size="compact"
          onClick={() => props.clearClientState()}
          css={{
            display: 'inherit',
            '@sm': {
              display: 'none',
            }
          }}
        >X</Button>
        <Button
          variant='link'
          size="compact"
          onClick={() => props.clearClientState()}
          css={{
            display: 'none',
            '@sm': {
              display: 'inherit',
            }
          }}
        >Clear</Button>
      </Flex>}
    </Flex>
  );
};
