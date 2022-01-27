import Box from "../../../components/box";
import Flex from "../../../components/flex/Flex";
import { Text } from "../../../components/text/Text";

export const ListWrapper = (
  { footer, columns, infinitePagination, loading }:
  { footer: JSX.Element, columns: JSX.Element, infinitePagination: JSX.Element, loading: boolean }
) => {

  return (
    <Box css={{
      border: 'solid 1px #e2e8f0',
      borderRadius: '$8px',
      padding: '1rem',
      width: '$full',
    }}>
      <Flex css={{
        py: '1rem',
        gap: '1rem',
        alignItems: 'start',
        flexFlow: 'row nowrap',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 5px 5px -5px rgba(21, 29, 34, 0.08)',
      }}>
        {columns}
      </Flex>

      {infinitePagination}

      <Flex css={{
        pt: '1rem',
        gap: '1rem',
        alignItems: 'center',
      }}>
        <Text variant="headings-title-default-bold">
          {footer}
        </Text>
      </Flex>
    </Box>
  );
}