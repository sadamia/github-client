import Flex from "../../../components/flex/Flex";
import { Text } from "../../../components/text/Text";

export const OptimisticContainer = ({ message }: { message: string }) => {
  return (
    <Flex data-testid="optimistic-container" direction="column" align="center" justify="center" css={{
      gap: "0.5rem",
      padding: "1rem",
      width: "100%",
      minHeight: `${55 * 10}px`,
    }}>
      <Flex justify="center" css={{
        padding: "1rem",
        background: "#e2e8f0",
        fontSize: "14px",
        borderRadius: "4px",
        minWidth: "260px",
        "@sm": {
          minWidth: "280px",
          padding: "3rem",
        }
      }}>
        <Text variant="body-default">{message}</Text>
      </Flex>
    </Flex>
  );
};