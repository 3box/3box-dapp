import ThreeBox from '3box';
import ThreeBoxActivity from '3box-activity';

import address from '../utils/address';
import {
  store,
} from './store';

const GET_THREEBOX = 'GET_THREEBOX';
const GET_PROFILE = 'GET_PROFILE';

const GET_PUBLIC_NAME = 'GET_PUBLIC_NAME';
const GET_PUBLIC_GITHUB = 'GET_PUBLIC_GITHUB';
const GET_PUBLIC_IMAGE = 'GET_PUBLIC_IMAGE';

const GET_PRIVATE_EMAIL = 'GET_PRIVATE_EMAIL';
const GET_ACTIVITY = 'GET_ACTIVITY';

const REQUEST_DATA = 'REQUEST_DATA';
const RECEIVE_DATA = 'RECEIVE_DATA';

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

const getActivity = () => async (dispatch) => {
  // ThreeBoxActivity.get(web3.eth.accounts[0]) // eslint-disable-line no-undef
  const returnedActivity = await ThreeBoxActivity.get(address); // eslint-disable-line no-undef
  const activity = await returnedActivity;

  activity.internal = activity.internal.map(object => Object.assign({
    dataType: 'internal',
  }, object));
  activity.txs = activity.txs.map(object => Object.assign({
    dataType: 'txs',
  }, object));
  activity.token = activity.token.map(object => Object.assign({
    dataType: 'token',
  }, object));

  const feed = activity.internal.concat(activity.txs).concat(activity.token);
  feed.sort((a, b) => b.timeStamp - a.timeStamp);

  dispatch({
    type: GET_ACTIVITY,
    feed,
  });
};

export {
  openBox,
  getPublicName,
  getPublicGithub,
  getPublicImage,
  getPrivateEmail,
  getActivity,

  GET_THREEBOX,
  GET_PROFILE,
  GET_PUBLIC_NAME,
  GET_PUBLIC_GITHUB,
  GET_PUBLIC_IMAGE,
  GET_PRIVATE_EMAIL,
  GET_ACTIVITY,

  REQUEST_DATA,
  RECEIVE_DATA,
};
