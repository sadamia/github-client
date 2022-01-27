import { ellipsis } from "polished";
import { clientStateVar } from "../../../cache";
import Button from "../../../components/button";
import Flex from "../../../components/flex/Flex";
import Grid from "../../../components/grid";
import { Text } from "../../../components/text/Text";
import { Maybe, RepositoryEdge } from "../../../generated/graphql";

export const RepositoryItem = ({ index, edge, style }: { index: number, edge: Maybe<RepositoryEdge>, style: any }) => {
  const mutate = (repository?: string, ownerLogin?: string, repositoryId?: string) => {
    clientStateVar({
      ...clientStateVar(),
      repository: repository,
      owner: ownerLogin,
      repositoryId: repositoryId,
    })
  };

  const mergedStyle = {
    ...style,
    ...{
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      gap: '1rem',
      width: '100%',
      borderBottom: '1px solid #e2e8f0',
    }
  }

  return (
    <div style={mergedStyle} key={index}>
      <Grid css={{
        alignItems: 'center',
        width: '100%',
        gap: '1rem',
        gridTemplateColumns: 'minmax(5rem, 1fr) minmax(3rem, 1fr) minmax(auto, 1fr)',
        '@sm': {
          gridTemplateColumns: 'minmax(12rem, 1fr) minmax(6rem, 1fr) minmax(4rem, 1fr) minmax(auto, 1fr)',
        },
        '@md': {
          gridTemplateColumns: 'minmax(12rem, 1fr) minmax(6rem, 1fr) minmax(8rem, 1fr) minmax(auto, 1fr)',
        },
        '@lg': {
          gridTemplateColumns: 'minmax(12rem, 1fr) minmax(12rem, 1fr) minmax(12rem, 1fr) minmax(auto, 1fr)',
        },
        '& .profile-btn': {
          display: 'none',
          '@sm': {
            display: 'flex',
          },
        },
      }}>
        <Text
          variant="body-sm"
          css={{
            wordBreak: 'break-all',
            display: 'none',
            '@sm': { display: 'inherit' },
          }}
        >
          {edge?.node?.name}
        </Text>
        <Button
          variant="link"
          css={{
            justifyContent: 'start',
            wordBreak: 'break-all',
            display: 'inherit',
            textAlign: 'left',
            ...ellipsis(80),
            '@sm': { display: 'none' },
          }}
          onClick={() => mutate(edge?.node?.name, edge?.node?.owner?.login, edge?.node?.id)}
        >
          {edge?.node?.name}
        </Button>
        <Text variant="body-sm">{edge?.node?.watchers.totalCount}</Text>
        <Text variant="body-sm">{edge?.node?.stargazers?.totalCount}</Text>
        <Flex className="profile-btn" css={{ justifyContent: 'end', paddingRight: '3px' }}>
          <Button
            variant="secondary"
            onClick={() => mutate(edge?.node?.name, edge?.node?.owner?.login, edge?.node?.id)}>
            View Issues
          </Button>
        </Flex>
      </Grid>
    </div>
  )
}