/**
 * uPort Demo Purposes
 * 
 * The following uPort settings are simply for testing uPort in the browser environment, without
 * setting up a server to issue/request credentials.
 * 
 * Including the SimpleSigner in the browser environment is INSECURE and should NEVER be done
 * in a production environment.
 */

import { SimpleSigner } from 'uport-connect'
const appName = 'Eidenai'
const appSettings =  {
    clientId: '2oo7fQjxR44MnKa8n4XKDZBBa2Buty4qrug',
    network: 'rinkeby',
    signer: SimpleSigner('d12d8a5c643ab7facc0a1815807aba1bed174762a2061b6b098b7bffd7462236')
}
export default {
  appName,
  appSettings
}