import ThreeBox from '3box';

import {
  store,
} from './store';

const GET_THREEBOX = 'GET_THREEBOX';
const GET_PROFILE = 'GET_PROFILE';

const GET_PUBLIC_NAME = 'GET_PUBLIC_NAME';
const GET_PUBLIC_GITHUB = 'GET_PUBLIC_GITHUB';
const GET_PUBLIC_IMAGE = 'GET_PUBLIC_IMAGE';

const GET_PRIVATE_EMAIL = 'GET_PRIVATE_EMAIL';

const GET_PUBLIC = 'GET_PUBLIC';
const SET_PUBLIC = 'SET_PUBLIC';
const REMOVE_PUBLIC = 'REMOVE_PUBLIC';
const GET_PRIVATE = 'GET_PRIVATE';
const SET_PRIVATE = 'SET_PRIVATE';
const REMOVE_PRIVATE = 'REMOVE_PRIVATE';

const openBox = () => async (dispatch) => {
  const returnedBox = await ThreeBox
    .openBox(web3.eth.accounts[0], web3.currentProvider); // eslint-disable-line no-undef
  const threeBox = await returnedBox;
  dispatch({
    type: GET_THREEBOX,
    threeBox,
  });
};

const getPublicName = () => async (dispatch) => {
  const returnedName = await store.getState().threeBoxData.threeBoxObject.profileStore.get('name');
  const name = await returnedName;
  dispatch({
    type: GET_PUBLIC_NAME,
    name,
  });
};

const getPublicGithub = () => async (dispatch) => {
  const returnedGithub = await store.getState().threeBoxData.threeBoxObject.profileStore.get('github');
  const github = await returnedGithub;
  dispatch({
    type: GET_PUBLIC_GITHUB,
    github,
  });
};

const getPublicImage = () => async (dispatch) => {
  const returnedImage = await store.getState().threeBoxData.threeBoxObject.profileStore.get('image');
  const image = await returnedImage;
  dispatch({
    type: GET_PUBLIC_IMAGE,
    image,
  });
};

const getPrivateEmail = () => async (dispatch) => {
  const returnedEmail = await store.getState().threeBoxData.threeBoxObject.privateStore.get('email');
  const email = await returnedEmail;
  dispatch({
    type: GET_PRIVATE_EMAIL,
    email,
  });
};

export {
  openBox,
  getPublicName,
  getPublicGithub,
  getPublicImage,
  getPrivateEmail,

  GET_THREEBOX,
  GET_PROFILE,
  GET_PUBLIC_NAME,
  GET_PUBLIC_GITHUB,
  GET_PUBLIC_IMAGE,
  GET_PRIVATE_EMAIL,

  GET_PUBLIC,
  SET_PUBLIC,
  REMOVE_PUBLIC,
  GET_PRIVATE,
  SET_PRIVATE,
  REMOVE_PRIVATE,
};


// const openBox = () => (dispatch) => {
//   ThreeBox
//     .openBox(web3.eth.accounts[0], web3.currentProvider) // eslint-disable-line no-undef
//     .then((threeBox) => {
//       dispatch({
//         type: GET_THREEBOX,
//         threeBox,
//       });
//     })
//     .catch(error => console.log(error)); // eslint-disable-line no-console
//   return Promise.resolve();
// };

// function openBox() {
//   return (dispatch) => {
//     return ThreeBox
//       .openBox(web3.eth.accounts[0], web3.currentProvider) // eslint-disable-line no-undef
//       .then(threeBox => dispatch({
//         type: GET_THREEBOX,
//         threeBox,
//       }))
//       .catch(error => console.log(error)); // eslint-disable-line no-console
//   };
// }