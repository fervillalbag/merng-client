
import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'
import useForm from '../utils/hooks'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

export default function PostForm() {

  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: ''
  })

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    refetchQueries: [{
      query: FETCH_POSTS_QUERY,
    }],
  })

  async function createPostCallback() {
    try {
      await createPost()
      values.body = ''
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Form onSubmit={
        onSubmit
      }>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
        </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id body createdAt username
      likes {
        id username createdAt
      }
      likeCount
      comments {
        id body username createdAt
      }
      commentCount
    }
  }
`
