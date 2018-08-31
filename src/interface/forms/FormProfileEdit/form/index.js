/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { Field } from 'redux-form'
/* ------------------------- Internal Dependencies -------------------------- */
// atoms
import StyleFieldDefault from 'static/style/StyleFieldDefault'
import {
  Box, 
  Button, Heading, Paragraph,
  BackgroundImage, 
  Form, ReduxField
} from 'atomic'
import { avatarDemo } from "assets/images"
/* ---------------------------- Form Component ------------------------------ */
export default ({ handleSubmit, isSubmitting, styled, ...props}) =>
<Box w={1}>
  <Form {...styled} w={1}>
    <Box >
      <Box w={120} h={120} b="2px solid #FFF" br={99999} boxShadow={2}>
        <BackgroundImage src={avatarDemo} br={99999} />
      </Box>
      <Paragraph f={[1]} color="gray" >
        Upload New Profile Image
      </Paragraph>
      <Heading f={[2]} color="charcoal" >
        Ethereum Address
      </Heading>
      <Paragraph f={[1]} color="gray" >
        0x80e3e96dbc68416be9d82dee3999f0f738a5252a
      </Paragraph>
      <Heading f={[3]} color="charcoal" >
        Public Information
      </Heading>
      <Field name="identityName" 
        placeholder="Full Name" 
        component={ReduxField} type="text" 
        {...StyleFieldDefault} h={50}
      />
      <Field name="socialGithub" 
        placeholder="GitHub Address" 
        component={ReduxField} type="text" 
        {...StyleFieldDefault} h={50}
      />
      <Field name="socialTwitter" 
        placeholder="GitHub Address" 
        component={ReduxField} type="text" 
        {...StyleFieldDefault} h={50}
      />
      <Field name="socialLinkedIn" 
        placeholder="LinkedIn Address" 
        component={ReduxField} type="text" 
        {...StyleFieldDefault} h={50}
      />      
    </Box>
    <Box mt={10} >
      <Button type="submit" onClick={handleSubmit} gradient={'cherry'} w={1} py={15} >
        Submit
      </Button>
    </Box>
  </Form>
</Box>