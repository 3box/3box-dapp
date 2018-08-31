/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
/* ------------------------- Internal Dependencies -------------------------- */
import assets from 'assets'
import {
 Flex, Box, Heading, Link, BackgroundImage
} from 'atomic'

import { avatarDemo } from "assets/images"
import { PopoverPure } from 'containers'
import PopoverClose from 'containers/popover/PopoverClose'
/* ------------------------------- Component -------------------------------- */

export default props => <Flex diretion={['column', 'row']} >
  <Box px={[10]}>
    <PopoverPure delta='MenuProfile' body={Body} >
      <Box w={40} h={40} b="2px solid #FFF" br={99999} boxShadow={2} mx="auto" >
          <BackgroundImage src={avatarDemo} br={99999} />
        </Box>
    </PopoverPure>
    </Box>
</Flex>

const Body = props => <Box w={[180]} boxShadow={1} hover={{boxShadow: 2}}  br={10} bg='white' p={[10,15]} >
  <Box>
    <Link to="/profile" >
      <Heading f={[2]} color="charcoal" >
        Profile
      </Heading>
    </Link>
    <Link to="/profile/edit" >
      <Heading f={[2]} color="charcoal" >
        Edit Profile
      </Heading>
    </Link>
    <Link to="/settings" >
      <Heading f={[2]} color="charcoal" >
        Settings
      </Heading>
    </Link>
    <Link to="/logout" >
      <Heading f={[2]} color="charcoal" >
        Logout
      </Heading>
    </Link>
  </Box>
</Box>
