/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
/* ------------------------- Internal Dependencies -------------------------- */
import {
  Box, Container, Blockquote, Button, Flex,
  Heading, Paragraph, Image, BackgroundImage,
} from 'atomic'

// import DemoContent from "./exampleAnchors";
/* ------------------------------- Component -------------------------------- */
export default props =>
<Box align='center' justify='center'>
  <Container w={[980]} py={40} >
    <Heading f={[4,5]} color='red' >
      How It Works
    </Heading>
    <Paragraph f={[1]}>
      Sed vel convallis justo. Vestibulum vel ullamcorper ante. Duis magna neque, pharetra ut luctus nec, egestas sit amet leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam consequat ipsum eros. In hac habitasse platea dictumst. Vivamus commodo risus a dolor rutrum, bibendum consectetur ligula tincidunt. In id laoreet nulla. Proin egestas commodo tellus vel vehicula.
    </Paragraph>
    <Paragraph f={[1]}>
      Sed vel convallis justo. Vestibulum vel ullamcorper ante. Duis magna neque, pharetra ut luctus nec, egestas sit amet leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam consequat ipsum eros. In hac habitasse platea dictumst. Vivamus commodo risus a dolor rutrum, bibendum consectetur ligula tincidunt. In id laoreet nulla. Proin egestas commodo tellus vel vehicula.
    </Paragraph>
    <Heading f={[3]} color='red' >
      Ethereum Profiles
    </Heading>
    <Paragraph f={[1]}>
      Sed vel convallis justo. Vestibulum vel ullamcorper ante. Duis magna neque, pharetra ut luctus nec, egestas sit amet leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam consequat ipsum eros. In hac habitasse platea dictumst. Vivamus commodo risus a dolor rutrum, bibendum consectetur ligula tincidunt. In id laoreet nulla. Proin egestas commodo tellus vel vehicula.
    </Paragraph>
    <Heading f={[3]} color='red' >
      IPFS
    </Heading>
    <Paragraph f={[1]}>
      Sed vel convallis justo. Vestibulum vel ullamcorper ante. Duis magna neque, pharetra ut luctus nec, egestas sit amet leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam consequat ipsum eros. In hac habitasse platea dictumst. Vivamus commodo risus a dolor rutrum, bibendum consectetur ligula tincidunt. In id laoreet nulla. Proin egestas commodo tellus vel vehicula.
    </Paragraph>
    <Heading f={[3]} color='red' >
      Orbit Database
    </Heading>
    <Paragraph f={[1]}>
      Sed vel convallis justo. Vestibulum vel ullamcorper ante. Duis magna neque, pharetra ut luctus nec, egestas sit amet leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam consequat ipsum eros. In hac habitasse platea dictumst. Vivamus commodo risus a dolor rutrum, bibendum consectetur ligula tincidunt. In id laoreet nulla. Proin egestas commodo tellus vel vehicula.
    </Paragraph>
  </Container>
</Box>



const CardTrustAnchor = props => <Flex p={20} br={15} boxShadow={1} mb={15} >
  <Flex p={15} w={[1,1,0.3]} >
    <Box w={1} boxShadow={1} br={10} >
      <BackgroundImage src={props.image} br={10} />
    </Box>
  </Flex>
  <Flex direction={'column'}  w={[1,1,0.7]} p={25} >
    <Heading f={[4,5]} color="purple" >
      {props.title}
    </Heading>
    <Heading f={[3]} color="charcoal" >
      {props.tagline}
    </Heading>
    <Heading f={[1]} color="gray" >
      Signature: {props.signature}
    </Heading>
    <Paragraph f={[1]}>
      <strong>Category: </strong> {props.category}
    </Paragraph>
    <Paragraph f={[1]}>
      {props.description}
    </Paragraph>
  </Flex>

</Flex>