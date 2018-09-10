const GET_THREEBOX = 'GET_THREEBOX';
const SAVE_THREEBOX = 'SAVE_THREEBOX';

const saveThreeBoxObject = threeBox => ({
  type: SAVE_THREEBOX,
  threeBox,
});

export {
  GET_THREEBOX,
  SAVE_THREEBOX,
  saveThreeBoxObject,
};

// const saveThreeBoxObject = (threeBox) => {
//   ThreeBox
//     .openBox(web3.eth.accounts[0], web3.currentProvider) // eslint-disable-line no-undef
//     .then((threeBox) => {
//       threeBoxAction(threeBox);
//       threeBox.profileStore.get('name').then(res => console.log(res)); // eslint-disable-line no-console
//       console.log('in threebox', threeBox); // eslint-disable-line no-console
//       // threeBox.profileStore.set('name', 'kenzo').then(res => console.log(res));
//       // threeBox.privateStore.set('email', 'kenzo@nyu.edu').then(res => console.log(res));
//       // threeBox.privateStore.get('email').then(res => console.log(res));
//     }).catch(error => console.log(error)); // eslint-disable-line no-console

//   return {
//     type: SAVE_THREEBOX,
//     threeBox,
//   };
// };