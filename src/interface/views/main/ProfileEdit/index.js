/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import styled from 'styled-components'
/* ------------------------- Internal Dependencies -------------------------- */
import {
  Box, Container, Blockquote, Button, Flex, Section,
  Heading, Paragraph, Image, BackgroundImage, SVG, Span
} from 'atomic'
import { FormProfileEdit } from "forms"

import { avatarDemo } from "assets/images"
import { chatDrawn } from "assets/svg"

import transactions from "demo/data/transactions"
const FlexBorder = styled(Flex)`
  border-bottom: 1px solid #ededed;
`
/* ------------------------------- Component -------------------------------- */
export default props =>
<Section px={0} >
  <Flex >
  <Flex direction="column" bg="#efefef" w={[1,0.3]} p={40} >
      <ProfilePreview/>
      <PublicInformation/>
      <PrivateInformation/>
      <Box mt={[20,60]} ta="center" >
        <Button>
          Edit
        </Button>
      </Box>
    </Flex>
    <Flex direction="column" bg="#f8f8f8" w={[1,0.7]} >
      <Container w={[780]} py={40} >
        <FormProfileEdit/>
      </Container>
    </Flex>
  </Flex>
</Section>


const ProfilePreview = props => 
<Box >
  <Box w={180} h={180} b="2px solid #FFF" br={99999} boxShadow={2} mx="auto" >
    <BackgroundImage src={avatarDemo} br={99999} />
  </Box>
  <Heading f={[3]} mt={20} >
    Kames "Blockchain Bard" Geraghty
  </Heading>
  <Flex>
    <Box w={20} h={20} bg="red" br={99999} />
    <Paragraph f={[1]}>
      0x80e3e96db...
    </Paragraph>
  </Flex>
</Box>

const PublicInformation = props => <Box mt={[20,50]} p={20} >
  <Heading f={[3]}>
    Public
  </Heading>
  <Flex direction="row">
    <SVG svg={chatDrawn} w={20} h={20}/>
    <Paragraph f={[1]}>
      info@kamescg.com
    </Paragraph>  
  </Flex>
  <Flex direction="row">
    <SVG svg={chatDrawn} w={20} h={20}/>
    <Paragraph f={[1]}>
      github.com/kamescg
    </Paragraph>  
  </Flex>
  <Flex direction="row">
    <SVG svg={chatDrawn} w={20} h={20}/>
    <Paragraph f={[1]}>
      twitter.com/kamescg
    </Paragraph>  
  </Flex>
</Box>

const PrivateInformation = props => <Box mt={[20,50]} bg="#d8d8d8" b="2px solid #979797"  p={20} >
  <Heading f={[3]}>
    Private
  </Heading>
  <Flex direction="column">
    <SVG svg={chatDrawn} w={20} h={20}/>
    <Paragraph f={[1]}>
      info@kamescg.com
    </Paragraph>  
  </Flex>
</Box>

const Transactions = props => <Box bg="white" boxShadow={0} >
  <FlexBorder justify="space-evenly" b="1px bottom solid #ededed" py={[20,30]} >
    <Box w={0.15} ta="center" >
      <Span>
        Entity
      </Span>
    </Box>
    <Box w={0.15} ta="center" >
      <Span>
        Function
      </Span>
    </Box>
    <Box w={0.15} ta="center" >
      <Span>
        Destinaton
      </Span>
    </Box>
    <Box w={0.15} ta="center" >
      <Span>
        Amount
      </Span>
    </Box>
    <Box w={0.15} ta="center" >
      <Span>
        Detail
      </Span>
    </Box>
    <Box w={0.15} ta="center" >
      <Span>
        Date
      </Span>
    </Box>
    <Box w={0.15} ta="center" >
      <Span>
        More
      </Span>
    </Box>
  </FlexBorder>
  <Flex direction="column" >
    {
      transactions.map(item=> <FlexBorder justify="space-evenly" py={[20,35]}>
        <Box w={0.15} ta="center" >
          <Image w={30} src={item.logo}/>
        </Box>
        <Box w={0.15} ta="center" >
          <Span>{item.function}</Span>
        </Box>
        <Box w={0.15} ta="center" >
          <Span>{item.name}</Span>
        </Box>
        <Box w={0.15} ta="center" >
          <Span>{item.amount}</Span>
        </Box>
        <Box w={0.15} ta="center" >
          <Span>{item.symbol}</Span>
        </Box>
        <Box w={0.15} ta="center" >
          <Span>{item.date}</Span>
        </Box>
        <Box w={0.15} ta="center" >
          <Span>{item.txHash}</Span>
        </Box>
      </FlexBorder>)
    }

  </Flex>
</Box>