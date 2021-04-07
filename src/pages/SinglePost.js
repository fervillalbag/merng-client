
import React, { useContext, useRef, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import moment from 'moment'
import { Button, Card, Grid, Icon, Image, Label, Form } from 'semantic-ui-react'
import LikeButton from '../components/LikeButton'
import { AuthContext } from '../context/auth'
import DeleteButton from '../components/DeleteButton'
import DeleteComment from '../components/DeleteComment'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

export default function SinglePost(props) {

  // const postId = props.match.params.id
  const [comment, setComment] = useState('')

  const { user } = useContext(AuthContext)

  const commentInputRef = useRef(null)
  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId: props.match.params.id
    }
  })

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    refetchQueries: [{
      query: FETCH_POSTS_QUERY,
    }],
    variables: {
      postId: props.match.params.id,
      body: comment
    }
  })

  function handleComment() {
    submitComment()
    commentInputRef.current.blur()
    setComment('')
  }

  if (loading || !data) return null

  function deletePostCallback() {
    props.history.push('/')
  }

  let postMarkup
  if (!data.getPost) {
    postMarkup = <p>Loading post..</p>
  } else {
    const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = data.getPost
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://i.picsum.photos/id/368/200/200.jpg?hmac=ej5Lmr5qh7f88zx85PnlHj2GKfwrNNWf6-lACRJ34qI"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  {username}
                </Card.Header>
                <Card.Meta>
                  {moment(createdAt).fromNow()}
                </Card.Meta>
                <Card.Description>
                  {body}
                </Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log('comment on post')}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton
                    postId={id}
                    callback={deletePostCallback}
                  />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        ref={commentInputRef}
                      />
                      <button type="submit" className="ui button teal" disabled={comment.trim() === ''} onClick={handleComment}>
                        Submit
                    </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map(comment => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteComment postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>
                    {comment.username}
                  </Card.Header>
                  <Card.Meta>
                    {moment(comment.createdAt).fromNow()}
                  </Card.Meta>
                  <Card.Description>
                    {comment.body}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return (
    <div>
      {postMarkup}
    </div>
  )
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id body createdAt username
      }
      commentCount
    }
  }
`

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id body createdAt username likeCount
      likes {
        username
      }
      commentCount
      comments {
        id username createdAt body
      }
    }
  }
`