import React from 'react'
import { Link } from 'react-router-dom'

import { DrawerClose } from 'containers'

const DrawerLink  = props => <Link {...props} ><DrawerClose>{props.children}</DrawerClose></Link>

Link.defaultProps = {
  to: '/'
}

export default DrawerLink
