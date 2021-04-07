
import { gql } from '@apollo/client'

export const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      username
      createdAt
      likeCount
      commentCount
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        id
        username
      }
    }
  }
`