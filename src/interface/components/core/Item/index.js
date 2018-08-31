/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import Foundry from 'foundry'
/* ---------------------------- Module Package ------------------------------ */
export default ({data, foundry, styled, ...props}) =>!foundry ? null
: (typeof foundry === 'function')
    ? React.createElement(foundry, {...props, data, styled})
    : (typeof foundry === 'string')
        ? !Foundry[foundry]
            ? null
            : React.createElement(Foundry[foundry], {...props, data, ...styled})
        : React.cloneElement(foundry, {...props, data, ...styled})
