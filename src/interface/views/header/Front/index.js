/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
/* ------------------------- Internal Dependencies -------------------------- */
import { INSERT_IMAGE } from 'assets/images'
import { 
  Flex, Box,
  Container, Heading, Paragraph, Section,
  MacbookDisplay,
} from 'atomic'
/* ------------------------------- Component -------------------------------- */
export default props => 
<Section {...props} px={[20,40]} color='white' pos='relative' >
  <Container w={[1200]} >
    <Flex direction={['column', 'row']}  mh={['80vh']} align='center' justify={['center']} >
      <Box w={[1,1,0, 0.5]} color='white' px={[20,40]}  >
        <Container mt={25} w={[560]} >
        <Heading level={[3]} f={[4,5]}mb={15}  >
          3Box
        </Heading>
        <Heading level={[3]} f={[2,3]}mb={25}  >
          Sharable Ethereum Profiles
        </Heading>
        <Paragraph f={[2]}>
          3Box is an open source data storage solution for web3 that allows end users to manage their public and private information on the decentralized web. Data is stored on IPFS and managed via OrbitDB.
        </Paragraph>
        <Paragraph f={[1]}>
          Profiles are easily shareable user profiles for Ethereum addresses that consist of public and private information, and public activity feeds. Public Profiles are searchable and viewable by anyone, while access to Private Profiles must be initially requested from the user by the dapp via an ERC 712 signature through the web3 API.
        </Paragraph>
        </Container>
      </Box>

      <Box w={[1,1,0, 0.5]} >
        <Box w={[1,1,0, '130%']} >
          <MacbookDisplay>
            {/* <Image src={INSERT_IMAGE}/> */}
          </MacbookDisplay>
        </Box>
      </Box>

    </Flex>
  </Container>

</Section>
