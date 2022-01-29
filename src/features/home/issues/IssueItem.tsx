import { formatDistanceToNow } from "date-fns";
import { ellipsis } from "polished";
import { CSSProperties } from "react";
import { clientStateVar } from "../../../cache";
import Button from "../../../components/button";
import Flex from "../../../components/flex/Flex";
import Grid from "../../../components/grid";
import { Text } from "../../../components/text/Text";
import { Maybe, IssueEdge } from "../../../generated/graphql";

export const IssueItem = ({ index, edge, style }:
  { index: number, edge: Maybe<IssueEdge>, style: CSSProperties }
) => {

  const mutate = (ownerLogin?: string) => {
    clientStateVar({
      ...clientStateVar(),
      selectedLogin: undefined,
      login: ownerLogin,
      repository: undefined,
      owner: undefined,
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
        gridTemplateColumns: 'calc(100% - 8rem) 7rem',

        '@sm': {
          gridTemplateColumns: 'calc(100% - 11rem) 10rem',
        },
        '@md': {
          gridTemplateColumns: 'calc(100% - 10rem) minmax(auto, 1fr)',
        },
      }}>
        <Text variant="body-sm"
          css={{
            wordBreak: 'break-all',
            justifyContent: 'flex-start',
            ...ellipsis(null, 2),
          }}
        >{edge?.node?.title}</Text>
        <Flex direction="column" justify="start">
          <Button
            variant="link"
            onClick={() => mutate(edge?.node?.author?.login)}
            css={{
              ...ellipsis(120),
              textAlign: 'left',
              padding: 0,
            }}
          >
            @{edge?.node?.author?.login}
          </Button>
          <Text variant="body-sm">
            {formatDistanceToNow(new Date(edge?.node?.updatedAt), { addSuffix: false })}
          </Text>
        </Flex>
      </Grid>
    </div>
  )
}