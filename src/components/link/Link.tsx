import { styled } from '../../theme';

const Link = styled('a', {
  textDecoration: 'none',
  lineHeight: '1',
  whiteSpace: 'nowrap',
  ':hover': {
    textDecoration: 'none',
  },
  variants: {
    decoration: {
      underline: {
      },
      none: {
        textDecoration: 'none',
        ':hover': {
          borderBottom: 'none',
        },
      },
    },
  },
});

export default Link;
