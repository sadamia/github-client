import React from 'react';
import { styled, VariantProps, CSS } from '../../theme';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import Flex from '../flex/Flex';

const StyledAvatar = styled(AvatarPrimitive.Root, {
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  boxSizing: 'border-box',
  display: 'flex',
  flexShrink: 0,
  position: 'relative',
  border: 'none',
  fontFamily: '$primary',
  lineHeight: '1',
  margin: '0',
  padding: '0',
  outline: 'none',
  fontWeight: '$medium',
  color: 'black',
  borderRadius: '$round',
  background: '#646464',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 'inherit',
    boxShadow: 'inset 0px 0px 1px rgba(0, 0, 0, 0.12)',
  },

  variants: {
    size: {
      'small': {
        width: '2.5rem',
        height: '2.5rem',
      },
      'medium': {
        width: '5rem',
        height: '5rem',
      }
    },
    inactive: {
      true: {
        opacity: '.3',
      },
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

const StyledAvatarImage = styled(AvatarPrimitive.Image, {
  display: 'flex',
  objectFit: 'cover',
  boxSizing: 'border-box',
  height: '100%',
  verticalAlign: 'middle',
  width: '100%',
});

type AvatarVariants = VariantProps<typeof StyledAvatar>;
type AvatarPrimitiveProps = React.ComponentProps<typeof AvatarPrimitive.Root>;
type AvatarOwnProps = AvatarPrimitiveProps &
  AvatarVariants & {
    css?: CSS;
    alt?: string;
    src?: string;
    fallback?: React.ReactNode;
  };

export const Avatar = React.forwardRef<React.ElementRef<typeof StyledAvatar>, AvatarOwnProps>(
  ({ alt, src, fallback, size, css, ...props }, forwardedRef) => {
    return (
      <Flex
        direction="column"
        css={{
          ...(css as any),
          height: 'fit-content',
          width: 'fit-content',
          alignItems: 'center',
        }}
      >
        <StyledAvatar {...props} ref={forwardedRef} size={size}>
          <StyledAvatarImage alt={alt} src={src} />
        </StyledAvatar>
      </Flex>
    );
  }
);

export const AvatarImage = StyledAvatarImage;