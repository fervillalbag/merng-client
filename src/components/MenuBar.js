
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'

export default function MenuBar() {

  const { user, logout } = useContext(AuthContext)
  const pathname = window.location.pathname
  // /about

  const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem] = useState(path)

  // const handleItemClick = (_, { name }) => setActiveItem(name)

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name={user.username}
        active
        as={Link}
        to="/"
        style={{ textTransform: 'lowercase' }}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name='logout'
          active={activeItem === 'login'}
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="Home"
        active={activeItem === '/'}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  )

  return menuBar
}