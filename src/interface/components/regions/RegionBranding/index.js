/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
/* ------------------------- Internal Dependencies -------------------------- */
import {
  Flex, Box, Absolute, Container,
  Heading, Image, Paragraph, Link, Span, 
} from 'atomic'

import DrawerOpen from 'containers/drawer/DrawerOpen'
import MenuPopoverProfile from 'components/menus/MenuPopoverProfile'
/* ------------------------------- Component -------------------------------- */
export default props =>
<Flex bg="white" boxShadow={[3]} b={"2px bottom #bb3636"} >
    <Container w={[1280]} >
      <Flex
        direction={['column', 'row']} align={"stretch"} justify="center"
        color={['charcoal']}
        pos='relative'
      >
        <Flex align="center" justify="left" w={[1, 1, 0.2]} pl={[15]} py={[7]} direction={['row']} >
            <Link to="/">
              <Flex align="center" >
                <Box br={5} bg="blue" p={10} ta="center" w={40} h={40} >
                  <Heading level={4} color='white' mb={0} fontSize={[3]} fontWeight={'100'}>
                    <strong>3</strong>
                  </Heading>
                </Box>
                <Heading f={[3]} color="blue" mb={0} p={0} >
                  Box
                </Heading>
              </Flex>
            </Link>
        </Flex>
        
        <Flex align="flex-start" w={[1, 1, 0.7]} justify="flex-start" display={['none', 'none', 'Flex']} py={[15]} >
          <Link to="/about" >
          <Heading f={[2]} color='charcoal' fw={'300'} pr={15} >
              About
            </Heading>
          </Link>
          <Link to="/how-it-works" >
            <Heading f={[2]} color='charcoal' fw={'300'} pr={15} >
              How It Works
            </Heading>
          </Link>
        </Flex>
  
        <Flex align="center" justify='flex-center' py={[10]} w={[1, 1, 0.1]} textAlign="center">
          <MenuPopoverProfile/>
        </Flex>
      
    </Flex>
    </Container>


</Flex>