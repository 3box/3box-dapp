/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
/* ------------------------- Internal Dependencies -------------------------- */
import { universe } from 'assets/images'
import { waves } from 'assets/svg'
import {
  Flex, Box, Container, HorizontalRule,
  Heading, Paragraph, Section, Link, List,
  BackgroundImage, Shape
} from 'atomic'
/* ------------------------------- Component -------------------------------- */
export default props =>
<Section
  color='charocla'
  bg='white'
  py={[60,90]}
>
  <Container w={[1280]} >
    <Flex align='center' justify='space-between' direction='row' w={[1]} h={'20vh'}  >
      <Box w={[1,1,0.3]} >
        <Heading f={[3,4]}>
          3Box
        </Heading>
        <Paragraph f={[2]}>Ethereum Profiles</Paragraph>
        <Paragraph f={[0]}>
          3Box is an open source data storage solution for web3 that allows end users to manage their public and private information on the decentralized web. Data is stored on IPFS and managed via OrbitDB.
        </Paragraph>
        <Paragraph f={[0]}>
          © 2018 3Box/ConsenSys
        </Paragraph>
      </Box>
    </Flex>
  </Container>
</Section>
