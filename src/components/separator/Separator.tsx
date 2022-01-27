import { styled } from '../../theme';

export const Separator = styled('div', {
  border: 'none',
  margin: 0,
  flexShrink: 0,
  backgroundColor: '#C3DCF9',
  cursor: 'default',
  height: '1px',
  width: '$full',
  variants: {
    size: {
      '1': {
        '&[data-orientation="horizontal"]': {
          height: '1px',
        },
        '&[data-orientation="vertical"]': {
          width: '1px',
          height: '1rem',
        },
      },
    },
  },
  defaultVariants: {
    size: '1',
  },
});
