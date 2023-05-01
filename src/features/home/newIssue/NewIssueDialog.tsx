import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../components/button/Button";
import {
  Dialog,
  DialogTitle,
  DialogCloseIcon,
  DialogContent,
  DialogTrigger,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "../../../components/dialog/Dialog";
import CloseIcon from "../../../icons/CloseIcon";
import Grid from "../../../components/grid";
import { ButtonIcon } from "../../../components/buttonIcon/ButtonIcon";
import Flex from "../../../components/flex/Flex";
import Center from "../../../components/center/Center";
import { Text } from "../../../components/text/Text";
import TextField from "../../../components/textField";
import TextAreaField from "../../../components/textAreaField";
import { newIssueSchema } from "./newIssueSchema";
import { gql, useMutation } from "@apollo/client";
import { useGetSelectedRepositoryQuery } from "../../../generated/graphql";

interface Props {
  children?: React.ReactNode;
}

const CREATE_ISSUE = gql`
  mutation CreateIssue($repositoryId: ID!, $title: String!, $body: String!) {
    createIssue(
      input: { repositoryId: $repositoryId, title: $title, body: $body }
    ) {
      issue {
        id
        title
        author {
          login
        }
        updatedAt
      }
    }
  }
`;

export const NewIssueDialog = (props: Props) => {
  const [open, setOpen] = useState(false);
  const {
    reset,
    formState: { isValid, errors },
    getValues,
    register,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(newIssueSchema),
  });

  const cancelHandler = () => {
    setOpen(false);
  };

  const onOpenChange = useCallback(
    (open: boolean) => {
      setOpen(open);
      reset();
    },
    [reset]
  );

  const [addIssue, { loading, error }] = useMutation(CREATE_ISSUE, {
    refetchQueries: ["GetIssues"],
  });
  const { data: queryClientResult } = useGetSelectedRepositoryQuery();

  const save = useCallback(() => {
    addIssue({
      variables: {
        repositoryId: queryClientResult?.clientState?.repositoryId,
        title: getValues("title"),
        body: getValues("body"),
      },
    });
    setOpen(false);
  }, [addIssue, getValues, queryClientResult?.clientState?.repositoryId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogCloseIcon as={"div"}>
            <ButtonIcon onClick={cancelHandler}>
              <CloseIcon />
            </ButtonIcon>
          </DialogCloseIcon>
          <DialogTitle>New Issue</DialogTitle>
        </DialogHeader>

        <DialogBody
          css={{
            overflow: "scroll",
            height: "min-content",
          }}
        >
          <Grid
            css={{
              rowGap: "2rem",
              width: "$full",
              scrollBehavior: "smooth",
              padding: "1rem 1rem 20px 1rem",
              "@sm": {
                padding: "1rem 2rem 20px 2rem",
              },
            }}
          >
            <Flex
              direction="column"
              css={{
                gap: "1rem",
                padding: "1rem 0",
              }}
            >
              <TextField
                name="title"
                placeholder="Title"
                labelText="Title"
                validation={register("title")}
                error={errors.title}
              />

              <TextAreaField
                rows={5}
                name="body"
                placeholder="Leave a comment"
                labelText="Submit new issue"
                validation={register("body")}
                error={errors.body}
              />
              <Center>
                <Text>{error?.message}</Text>
              </Center>
            </Flex>
          </Grid>
        </DialogBody>

        <DialogFooter>
          <Flex>
            <Button
              onClick={cancelHandler}
              variant="secondary"
              full
              size={{
                "@initial": "compact",
                "@sm": "default",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={save}
              variant="primary"
              full
              size={{
                "@initial": "compact",
                "@sm": "default",
              }}
              isDisabled={!isValid}
            >
              {loading ? "Loading" : "Save"}
            </Button>
          </Flex>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
