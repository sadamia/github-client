import Flex from "../../../components/flex/Flex"
import { Skeleton } from "../../../components/skeleton/Skeleton"

export const LoadingContainer = () => {
  return (
    <Flex data-testid="loading-container" direction="column" align="center" justify="center" css={{
      width: '100%',
      [`& ${Skeleton}`]: {
        width: '100%',
      }
    }}>
      {[...Array(8)].map((e, index) => <Flex key={index} direction="column" css={{
        padding: '1.6rem 0',
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        gap: '1rem',
        borderBottom: '1px solid #e2e8f0',        
      }}>
        <Skeleton />
      </Flex>)}
    </Flex>
  )
}