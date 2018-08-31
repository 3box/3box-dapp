import { all } from 'redux-saga/effects';

import notifications from './notifications/sagas'
import ethers from './ethers/sagas'
import ipfs from './ipfs/sagas'
import web3 from './web3/sagas'

export default function* rootSaga() {
  yield all([
    notifications(),
    ethers(),
    ipfs(),
    web3()
  ]);
}