/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'

// import idx from './idx'
/* ------------------------- Internal Dependencies -------------------------- */
// atoms
import StyleFieldDefault from 'static/style/StyleFieldDefault'
import {
  Flex, Box, 
  Button, Heading, Image, Paragraph, Link, Span, SVG, List,
  BackgroundImage, BackgroundGradient,
  Form, ReduxField
} from 'atomic'
import {
  SelectField,
} from 'redux-form-material-ui'
/* ---------------------------- Form Component ------------------------------ */
export default ({ handleSubmit, isSubmitting, styled, ...props}) =>
<Box w={1}>
  <Form {...styled} w={1}>
    <Box >
      <Heading f={[3]}>
        Network
      </Heading>
      <Field
        name="networkDefault"
        component={SelectField}
        hintText="Network Default"
        floatingLabelText="Network Default"
      >
        <MenuItem value="mainnet" primaryText="Mainnet" />
        <MenuItem value="rinkeby" primaryText="Rinkeby" />
        <MenuItem value="kovan" primaryText="Kovan" />
        <MenuItem value="ropsten" primaryText="Ropsten" />
      </Field>

      <Heading f={[3]}>
        IPFS
      </Heading>
      <Field name="ipfsHost" 
        placeholder="Infura Host" 
        component={ReduxField} type="text" 
        {...StyleFieldDefault} h={50}
      />
      <Field name="ipfsPort" 
        placeholder="Infura Port" 
        component={ReduxField} type="text" 
        {...StyleFieldDefault} h={50}
      />
      <Field 
        name="ipfsProtocol"
        placeholder="Infura Protocol" 
        component={ReduxField} type="text" 
        {...StyleFieldDefault} h={50}
      />
      
    </Box>
    <Box mt={10} >
      <Button type="submit" onClick={handleSubmit} gradient={'blue'} w={1} py={15} >
        Submit
      </Button>
    </Box>
  </Form>
</Box>