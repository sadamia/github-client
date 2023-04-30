import Flex from "../../../components/flex/Flex"
import { Text } from "../../../components/text/Text";
import { Avatar } from "../../../components/avatar/Avatar";
import { ellipsis } from "polished";
import { useGetSelectedProfileQuery } from "../../../generated/graphql";

export const Badge = () => {
  const { data: queryClientResult } = useGetSelectedProfileQuery();

  if (!queryClientResult?.clientState?.login || !queryClientResult?.clientState?.selectedLogin) {
    return null;
  }
    return (
      <Flex
        css={{ 
          gap: '0.25rem', 
          alignItems: 'center',
          background: '#2d3748',
          borderRadius: '16px',
          padding: '0.125rem 0.5rem',
         }}>
        <Avatar
          src={queryClientResult?.clientState?.avatarUrl}
          size="xs"
        />
        <Text variant="body-sm" css={{ color: '#a0aec0', ...ellipsis(80),}}>
          @{queryClientResult?.clientState?.selectedLogin}
        </Text>
      </Flex>
    )

}