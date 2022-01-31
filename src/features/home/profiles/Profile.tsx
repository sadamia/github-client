import Flex from '../../../components/flex/Flex';
import { Text } from '../../../components/text/Text';
import { Avatar } from '../../../components/avatar/Avatar';
import { Maybe, User } from '../../../generated/graphql';
import { clientStateVar } from '../../../cache';
import Button from '../../../components/button';
import { ellipsis } from 'polished';

export const Profile = ({ item }: { item?: Maybe<User> }) => {

  const onClickHandler = (loginValue?: string, avatarUrl?: string) => {
    console.log(clientStateVar())
    clientStateVar({
      ...clientStateVar(),
      owner: undefined,
      repository: undefined,
      selectedLogin: loginValue,
      avatarUrl: avatarUrl,
    })
  };
  
  return (
    <Flex direction="column" css={{
      padding: '1rem',
      alignItems: 'center',
      background: '#2d3748',
      borderRadius: '$8px',
      width: '10rem',
      justifyContent: 'space-between',
      gap: '0.5rem',
      maxHeight: '230px',
    }}>
      <Avatar
        alt="Client"
        src={item?.avatarUrl}
        fallback="C"
        size="medium"
      />
      <Flex direction='column'
        css={{
          borderRadius: '$full',
          textAlign: 'center',
          gap: '0.25rem',
        }}
      >
        <Text
          variant='body-default'
          css={{
            fontWeight: '$regular',
            ...ellipsis(120),
            color: 'white',
          }}
        >{`@${item?.login}`}</Text>

        {item?.name && <Text
          variant='body-sm'
          css={{
            fontWeight: '$regular',
            ...ellipsis(120),
            color: '#a0aec0',
          }}
        >{`${item?.name}`}</Text>}
        <Flex justify="center" css={{ padding: '1rem 0', width: '120px'}}>
          <Button
            size="compact"
            css={{ width: '$full' }}
            onClick={() => onClickHandler(item?.login, item?.avatarUrl) }>
            Profile
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
