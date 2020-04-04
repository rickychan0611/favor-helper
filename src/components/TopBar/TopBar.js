import React from 'react'
import { Menu, Dropdown, Responsive } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";

import styles from './styles'

const options = [
  { key: 'register', icon: 'edit', text: 'Register', value: 'register' },
  { key: 'sign-in', icon: 'sign-in', text: 'Sign in', value: 'sign-in' },
  { key: 'sign-out', icon: 'sign-out', text: 'Sign out', value: 'sign-out' },
]


const TopBar = () => {
  const history = useHistory()
  const [state, setState] = React.useState({})
  const { activeItem, value } = state

  const handleItemClick = (e, { name }) => {
    setState({ activeItem: name })
    history.push(`/${name}`)
  }

  const handleClick = (e, { value }) => {
    console.log('Value' + value)
    history.push(`/${value}`)
  }

  return (
    <Menu borderless fluid
    >
      <Menu.Item
        name=''
        onClick={handleItemClick}
      >
        <img src='https://cdn.freebiesupply.com/logos/large/2x/facebook-love-logo-png-transparent.png' />
      </Menu.Item>

      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
      >
        Home
      </Menu.Item>

      <Menu.Item
        name='posts'
        active={activeItem === 'posts'}
        onClick={handleItemClick}
      >
        Posts
      </Menu.Item>
      <Menu.Menu position='right'>
        <Responsive minWidth={531} as={React.Fragment}>
          <Menu.Item
            name='sign-in'
            active={activeItem === 'sign-in'}
            onClick={handleItemClick}
          >
            Register
         </Menu.Item>
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
          >
            Sign-in
         </Menu.Item>
          <Menu.Item
            name='sign-out'
            active={activeItem === 'sign-out'}
            onClick={handleItemClick}
          >
            Sign-out
          </Menu.Item>
        </Responsive>
        <Responsive maxWidth={530} as={React.Fragment}>
          <Menu.Item>
            <Dropdown
              icon='bars'
              floating
              options={options}
              trigger={<React.Fragment />}
              value={value}
              onChange={handleClick}
            />
          </Menu.Item>
        </Responsive>
      </Menu.Menu>
    </Menu>
  )
}

export default TopBar