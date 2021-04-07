
import React, { useState } from 'react'
import { Button, Icon, Confirm, Popup } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

export default function DeleteComment({ postId, commentId, callback }) {

  const [confirm, setConfirm] = useState(false)

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      postId,
      commentId
    },
  })

  return (
    <>
      <Popup
        content="Delete comment"
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
        onConfirm={deleteComment}
      />
    </>
  )
}
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id username createdAt body
      }
      commentCount
    }
  }
`