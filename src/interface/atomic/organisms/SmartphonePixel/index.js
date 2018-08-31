/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import styled from 'styled-components'
import {Smartphone} from 'assets/devices'
import { Box, Image } from 'particles'

/* --------------------------- Styled Components ---------------------------- */
const Wrapper = styled(Box)`
  position: relative;

  img {
    max-width: 100% !important;
    width: 100% !important;
  }
`
const Content = styled(Box)`
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  position: absolute;
  overflow: hidden;
`

/* ------------------------- Component Properties --------------------------- */

/* ------------------------------- Component -------------------------------- */
const Component = props => (
  <Wrapper {...props} >
    <Image src={Smartphone} />
    <Content gradient='secondary' mb={['5.15%']} ml={['5.25%']} mr={['4%']} mt={['20%']}  z={[20]}>
      {props.children}
    </Content>
  </Wrapper>
)

/* ---------------------------- Export Package ------------------------------ */
export default Component