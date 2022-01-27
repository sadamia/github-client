import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../components/button/Button';
import {
  Dialog,
  DialogTitle,
  DialogCloseIcon,
  DialogContent,
  DialogTrigger,
  DialogBody,
  DialogHeader,
  DialogFooter
} from '../../../components/dialog/Dialog';
import CloseIcon from '../../../icons/CloseIcon';
import Grid from '../../../components/grid';
import { ButtonIcon } from '../../../components/buttonIcon/ButtonIcon';
import Flex from '../../../components/flex/Flex';
import Center from '../../../components/center/Center';
import { Text } from '../../../components/text/Text';
import TextField from '../../../components/textField';
import TextAreaField from '../../../components/textAreaField';
import { newIssueSchema } from './newIssueSchema';
import { gql, useMutation, useQuery } from '@apollo/client';

interface Props {
  children?: React.ReactNode,
}

const CREATE_ISSUE = gql`
mutation CreateIssue($repositoryId: String!, $title: String!, $body: String!) {
  createIssue(input: { 
    repositoryId: $repositoryId,
    title: $title,
    body: $body
  }) {
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

const GET_SELECTED_REPOSITORY = gql`
  query getSelectedRepository {
    clientState @client {
      repositoryId
    }
  }
`;

export const NewIssueDialog = (props: Props) => {
  const [open, setOpen] = useState(false)
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(newIssueSchema),
  });

  const cancelHander = () => {
    setOpen(false)
  }

  const onOpenChange = useCallback((open: boolean) => {
    setOpen(open)
    methods.reset()
  }, [methods])

  const [addIssue, { loading, error }] = useMutation(CREATE_ISSUE, {
    refetchQueries: ['GetIssues']
  });
  const { data: queryClientResult } = useQuery(GET_SELECTED_REPOSITORY);


  const save = useCallback(() => {
    addIssue({
      variables: {
        repositoryId: queryClientResult?.clientState?.repositoryId,
        title: methods.getValues('title'),
        body: methods.getValues('body'),
      }
    })
    setOpen(false);
  }, [addIssue, methods, queryClientResult?.clientState?.repositoryId])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogCloseIcon as={'div'}>
            <ButtonIcon onClick={cancelHander}>
              <CloseIcon />
            </ButtonIcon>
          </DialogCloseIcon>
          <DialogTitle>New Issue</DialogTitle>
        </DialogHeader>

        <DialogBody css={{
          overflow: 'scroll',
          height: 'calc(100vh - 144px)',
        }}>
          <Grid css={{
            rowGap: '2rem',
            width: '$full',
            scrollBehavior: 'smooth',
            padding: '1rem 1rem 20px 1rem',
            height: 'min-content',
            '@sm': {
              padding: '1rem 2rem 20px 2rem',
            }
          }}>
            <Flex direction="column" css={{
              gap: '1rem',
              padding: '1rem 0',
            }}>
              <TextField
                name="title"
                labelText="Title"
                validation={methods.register("title")}
                error={methods.formState.errors.title}
              />

              <TextAreaField
                rows={5}
                name="body"
                labelText="Submit new issue"
                validation={methods.register("body")}
                error={methods.formState.errors.body}
              />
              <Center>
                <Text>{error}</Text>
              </Center>
            </Flex>
          </Grid>
        </DialogBody>

        <DialogFooter>
          <Button
            onClick={cancelHander}
            variant="secondary"
            full
            size={{
              '@initial': 'compact',
              '@sm': 'default'
            }}
          >Cancel</Button>
          <Button
            onClick={save}
            variant="primary"
            full
            size={{
              '@initial': 'compact',
              '@sm': 'default'
            }}
            isDisabled={!methods.formState.isValid}
          >{loading ? 'Loading' : 'Save'}</Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}