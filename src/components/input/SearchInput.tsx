import React from 'react';
import SearchIcon from '../../icons/SearchIcon'
import Flex from '../flex/Flex';
import { Input, InputOwnProps } from './Input'
import Box from '../box';

export const SearchInput = React.forwardRef<
  React.ElementRef<typeof Input>, InputOwnProps
>((props, forwardedRef) => {
  return (
    <Flex css={{
      position: 'relative',
      alignItems: 'center',
      gap: '0.5rem',
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
    </Flex>
  );
});
