import React, { useEffect } from "react";
import { Text } from "../../../components/text/Text";
import Button from "../../../components/button";
import { Profile } from "./Profile";
import {
  Maybe,
  User,
  useGetLoginQuery,
  useGetUserByLoginLazyQuery,
} from "../../../generated/graphql";
import Flex from "../../../components/flex/Flex";
import { clientStateVar } from "../../../cache";
import Box from "../../../components/box";

const OptimisticContainer = ({
  css,
  children,
}: {
  css?: any;
  children: React.ReactNode;
}) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      css={{
        gap: "0.5rem",
        padding: "1rem",
        border: "dashed 3px #e2e8f0",
        borderRadius: "8px",
        width: "100%",
        minHeight: "230px",
        minWidth: "160px",
        ...css,
      }}
    >
      {children}
    </Flex>
  );
};

const EmptyProfilesList = () => {
  const mutate = (login: string) => {
    clientStateVar({
      login: login,
      owner: undefined,
      repository: undefined,
      repositoryId: undefined,
      selectedLogin: undefined,
    });
  };

  return (
    <OptimisticContainer
      css={{
        maxWidth: "100%",
        "@xl": {
          maxWidth: "160px",
          justifyContent: "start",
        },
      }}
    >
      <Box>
        <Text variant="body-sm">
          You have not entered any @github profiles yet.
        </Text>
      </Box>
      <Box>
        <Text variant="body-sm">Try for partial</Text>
        <Button
          variant="link"
          size="compact"
          onClick={() => mutate("kent")}
          css={{
            padding: "0 0.125rem",
            lineHeight: "$shorter",
          }}
        >
          kent
        </Button>
        <Text variant="body-sm"> and</Text>
        <Button
          variant="link"
          size="compact"
          onClick={() => mutate("@kentcdodds")}
          css={{
            padding: "0 0.125rem",
            lineHeight: "$shorter",
          }}
        >
          @kentcdodds
        </Button>
        <Text variant="body-sm"> for exact profile matches.</Text>
      </Box>
    </OptimisticContainer>
  );
};

const ProfilesList = () => {
  const [loadProfiles, { called, loading, data, fetchMore, error }] =
    useGetUserByLoginLazyQuery();
  const { data: queryClientResult } = useGetLoginQuery();

  useEffect(() => {
    if (queryClientResult?.clientState?.login) {
      loadProfiles({
        variables: { login: queryClientResult?.clientState?.login, first: 10 },
        fetchPolicy: "cache-and-network",
      });
    }
  }, [loadProfiles, queryClientResult?.clientState?.login]);

  if (error) {
    return (
      <OptimisticContainer>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </OptimisticContainer>
    );
  }

  if (called && loading) {
    return (
      <OptimisticContainer>
        <Flex justify="center" css={{ maxWidth: "160px" }}>
          <Text variant="headings-title-default-bold">Loading ...</Text>
        </Flex>
      </OptimisticContainer>
    );
  }

  if (!data || !queryClientResult?.clientState.login) {
    return <EmptyProfilesList />;
  }

  if (data?.search.edges?.length === 0) {
    return (
      <OptimisticContainer>
        <Text>This @github profile doesn't yet.</Text>
      </OptimisticContainer>
    );
  }

  return (
    <Flex
      data-testid="profile-list"
      css={{
        gap: "0.5rem",
        flexFlow: "row",
        "@xl": {
          flexFlow: "column nowrap",
          maxHeight: `${230 * 3}px`,
        },
      }}
    >
      {queryClientResult?.clientState.login &&
        data?.search.edges?.map((item, index) => (
          <Profile key={index} item={item?.node as Maybe<User>} />
        ))}
      {queryClientResult?.clientState.login &&
        data?.search?.pageInfo.hasNextPage && (
          <Flex
            direction="column"
            align="center"
            justify="center"
            css={{
              width: "100%",
              padding: "1rem",
              borderRadius: "$8px",
              maxWidth: "10rem",
              gap: "0.5rem",
              minHeight: "190px",
              border: "dashed 4px #e2e8f0",
              background: "white",
            }}
          >
            <Button
              onClick={() =>
                fetchMore({
                  variables: {
                    cursor: data?.search?.pageInfo.endCursor,
                    login: queryClientResult?.clientState?.login,
                    first: 10,
                  },
                })
              }
            >
              Load more
            </Button>
          </Flex>
        )}
    </Flex>
  );
};

export default ProfilesList;
