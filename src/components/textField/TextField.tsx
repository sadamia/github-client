import React from 'react';
import { styled, CSS, VariantProps } from '../../theme';
import Input from '../input';
import Grid from '../grid'
import Flex from '../flex/Flex';
import { Text } from '../text/Text'

const Wrapper = styled(Grid, {
  gridTemplateAreas: '"labelText" "input" "error"',
  gap: '0.25rem',
  alignItems: 'start',
})

type TextFieldCSSProp = { css?: CSS };
type TextFieldVariants = VariantProps<typeof Wrapper> &
{
  letterCount?: number,
  labelText?: string,
  error?: any;
  value?: string,
  placeholder?: string,
  type?: string,
  validation?: any
  name: string
};
type TextFieldOwnProps = TextFieldCSSProp & TextFieldVariants;


export const TextField = React.forwardRef<
  React.ElementRef<typeof Wrapper>, TextFieldOwnProps
>((props, forwardedRef) => {

  return (
    <Wrapper css={props.css} ref={forwardedRef}>
      {props.labelText &&
        <Text variant="body-default"
          css={{ gridArea: 'labelText', marginBottom: '2px', textAlign: 'left'}}>
          {props.labelText}
        </Text>}

      <Flex direction="column" css={{
        position: 'relative',
        gridArea: 'input',
      }}>
        <Input
          value={props.value}
          validation={props.validation}
          placeholder={props.placeholder}
          type={props.type || 'text'}
          css={{ marginBottom: '2px' }}
        />

        {props.error &&
          <Text
            variant="functional-error"
            css={{ marginBottom: '2px', textAlign: 'left'}}
          >
            {props?.error?.message}
          </Text>}
      </Flex>

    </Wrapper>
  );
});

TextField.toString = () => `.${Wrapper.className}`;

