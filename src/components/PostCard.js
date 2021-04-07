
import React, { useContext } from 'react'
import { Card, Icon, Label, Button, Image, Popup } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

export default function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {

  const { user } = useContext(AuthContext)

  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://i.picsum.photos/id/368/200/200.jpg?hmac=ej5Lmr5qh7f88zx85PnlHj2GKfwrNNWf6-lACRJ34qI'
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
          <Card.Description>
            {body}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>

          {/* Like Button */}
          <LikeButton post={{ id, likes, likeCount }} />
          {/* End Like Button */}

          {/* Comment Button */}
          <Popup
            content="Comment on post"
            inverted
            trigger={
              <Button labelPosition='right' as={Link} to={`/post/${id}`}>
                <Button basic color='blue'>
                  <Icon name='comments' />
                </Button>
                <Label basic color='blue' pointing='left'>
                  {commentCount}
                </Label>
              </Button>
            }
          />
          {/* End Comment Button */}

          {user && user.username === username && <DeleteButton postId={id} />}
        </Card.Content>
      </Card>
    </div >
  )
}
