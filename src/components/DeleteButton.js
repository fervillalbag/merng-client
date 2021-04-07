
import React, { useState } from 'react'
import { Button, Icon, Confirm, Popup } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

export default function DeleteButton({ postId, callback }) {

  const [confirm, setConfirm] = useState(false)

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      postId
    },
    refetchQueries: [{
      query: FETCH_POSTS_QUERY,
    }],
  })

  return (
    <>
      <Popup
        content="Delete post"
        trigger={
          <Button as="div" color="red" floated="right" onClick={() => setConfirm(true)}>
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
        inverted
      />
      <Confirm
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={deletePost}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`