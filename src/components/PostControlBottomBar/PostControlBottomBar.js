import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

import styles from './styles'

const PostControlBottomBar = ({children, openBottomBar}) => {
  return (
    // <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        // animation='push'
        icon='labeled'
        // vertical
        visible = {true}
        // width='thin'
        direction="bottom"
        widths={4}
      >
        <Menu.Item as='a'>
          <Icon name='eye' color="teal"/>
        Preview
      </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='save' color="teal"/>
        Save as draft
      </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='check' color="green"/>
        Publish
      </Menu.Item>
      <Menu.Item as='a'>
          <Icon name='close' color="grey"/>
        Cancel
      </Menu.Item>
      </Sidebar>

    // </Sidebar.Pushable>
  )
}

export default PostControlBottomBar