import ThreeBox from '3box';

const getProfile = () => {
  ThreeBox
    .openBox(web3.eth.accounts[0], web3.currentProvider) // eslint-disable-line no-undef
    .then((threeBox) => {
      threeBoxAction(threeBox);
      threeBox.profileStore.get('name').then(res => console.log(res)); // eslint-disable-line no-console
      console.log('in threebox', threeBox); // eslint-disable-line no-console
    }).catch(error => console.log(error)); // eslint-disable-line no-console
};

export {
  getProfile,
};
