/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import {  Block } from 'particles'
/* ------------------------- Internal Dependencies -------------------------- */
const layout = {
  is: 'header',
  of:'hidden',
  w: 1
}
/* ---------------------------- React Component ----------------------------- */
export default props => (
<Block {...props} {...layout} >
  {props.children}
</Block>
)
