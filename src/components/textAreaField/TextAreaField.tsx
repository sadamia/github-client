import React from 'react';
import { styled, CSS, VariantProps } from '../../theme';
import TextArea from '../textArea';
import Grid from '../grid'
import { Text } from '../text/Text'
import Flex from '../flex/Flex';

const Wrapper = styled(Grid, {
  gridTemplateAreas: '"labelText" "input" "errorText"',
  gap: '0.25rem',
})

type TextAreaFieldCSSProp = { css?: CSS };
type TextAreaFieldVariants = VariantProps<typeof Wrapper> &
{
  letterCount?: number,
  labelText?: string,
  description?: string,
  helper?: string,
  value?: string,
  error?: any,
  placeholder?: string,
  validation?: any
  name: string
  control?: any
  rows?: number
};
type TextAreaFieldOwnProps = TextAreaFieldCSSProp & TextAreaFieldVariants;


export const TextAreaField = React.forwardRef<
  React.ElementRef<typeof Wrapper>, TextAreaFieldOwnProps
>((props, forwardedRef) => {

  return <Wrapper css={props.css} ref={forwardedRef}>
    {props.labelText &&
      <Text
        variant="body-default"
        css={{
          gridArea: 'labelText',
          marginBottom: '2px',
          textAlign: 'left',
        }}
      >{props.labelText}</Text>}
    <Flex direction="column" css={{
      position: 'relative',
      gridArea: 'input',
    }}>
      <TextArea
        name={props.name}
        value={props.value}
        validation={props.validation}
        placeholder={props.placeholder}
        rows={props.rows}
        css={{
          gridArea: 'input',
          marginBottom: '2px'
        }}
      ></TextArea>

      {props.error &&
        <Text
          variant="functional-error"
          css={{ marginBottom: '2px', textAlign: 'left' }}
        >
          {props?.error?.message}
        </Text>}
    </Flex>
  </Wrapper>;
});

TextAreaField.toString = () => `.${Wrapper.className}`;

