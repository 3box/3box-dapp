/* ------------------------- External Dependencies -------------------------- */
import React from 'react';
import { Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
/* ------------------------- External Dependencies -------------------------- */
import DialogFactory from 'containers/dialog/DialogFactory'
import SiteEntry from 'layout'
import Block from 'atoms/Block'

// Toast Settings
const ToastSetting = {
  position: 'top-right',
  type: 'default',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  pauseOnHover: true,
}

export default () =>
<div>
  <Block z={[500]} >
    <DialogFactory/>
    <ToastContainer {...ToastSetting}/>
  </Block>
  <Block z={[300]} o={0.999999} >
      <Route path="/" component={SiteEntry} />
  </Block>
</div>
