import Flex from "../../../components/flex/Flex";
import { Skeleton } from "../../../components/skeleton/Skeleton";

export const LoadingContainer = ({ repeat }: { repeat: number}) => {
  return (
    <Flex data-testid="loading-container" direction="column" align="center" justify="center" css={{
      width: "100%",
    }}>
      {[...Array(repeat)].map((e, index) => <Flex key={index} direction="column" css={{
        padding: "1.6rem 0",
        flexFlow: "row nowrap",
        alignItems: "center",
        gap: "1rem",
        borderBottom: "1px solid #e2e8f0",
        width: "100%",
      }}>
        <Skeleton css={{ width: "100%" }} />
      </Flex>)}
    </Flex>
  );
};