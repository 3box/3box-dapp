import {
  checkWeb3Wallet,
  requestAccess,
  checkNetwork,
  signInGetBox,
  profileGetBox,
  getPublicName,
  getPublicGithub,
  getPublicImage,
  getPrivateEmail,
  getActivity,
  handleSignOut,
} from './actions';

test('checkWeb3Wallet', () => {
  const value = checkWeb3Wallet();
  expect(value).toBe();
  // hasWallet
  // mobileWalletRequiredModal
  // currentWallet
});