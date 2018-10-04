import {
  address
} from '../utils/address';

import {
  store,
} from './store';

export const signInUp = () => async (dispatch) => {
  let threeBox;
  dispatch({
    type: 'LOADING_3BOX',
  });
  try {
    const returnedBox = await ThreeBox // eslint-disable-line no-undef
      .openBox(address, web3.currentProvider); // eslint-disable-line no-undef
    threeBox = await returnedBox;
    const name = await threeBox.public.get('name');
    const github = await threeBox.public.get('github');
    const image = await threeBox.public.get('image');
    const email = await threeBox.private.get('email');

    const returnedActivity = await ThreeBoxActivity.get(address); // eslint-disable-line no-undef
    const activity = await returnedActivity;

    activity.internal = activity.internal.map(object => Object.assign({
      dataType: 'Internal',
    }, object));
    activity.txs = activity.txs.map(object => Object.assign({
      dataType: 'Txs',
    }, object));
    activity.token = activity.token.map(object => Object.assign({
      dataType: 'Token',
    }, object));

    const feed = activity.internal.concat(activity.txs).concat(activity.token);
    feed.sort((a, b) => b.timeStamp - a.timeStamp);

    // order feed chronologically and by address
    const feedByAddress = [];
    feed.map((item) => {
      const othersAddress = item.from === address ? item.to : item.from;
      if (feedByAddress.length > 0 && Object.keys(feedByAddress[feedByAddress.length - 1])[0] === othersAddress) {
        feedByAddress[feedByAddress.length - 1][othersAddress].push(item);
      } else {
        feedByAddress.push({
          [othersAddress]: [item],
        });
      }
    });

    dispatch({
      type: 'SIGN_IN_UP',
      threeBox,
      ifFetchingThreeBox: false,
      signUpSuccessful: true,
      errorMessage: '',
      showErrorModal: false,
      name,
      github,
      image,
      email,
      feedByAddress,
    });
  } catch (err) {
    dispatch({
      type: 'FAILED_LOADING_3BOX',
      errorMessage: err.message,
      showErrorModal: true,
    });
  }
};

export const openBox = () => async (dispatch) => {
  const returnedBox = await ThreeBox // eslint-disable-line no-undef
    .openBox(address, web3.currentProvider); // eslint-disable-line no-undef
  const threeBox = await returnedBox;
  dispatch({
    type: 'GET_THREEBOX',
    threeBox,
  });
};

export const getPublicName = () => async (dispatch) => {
  const returnedName = await store.getState().threeBoxData.threeBoxObject.public.get('name');
  const name = await returnedName;
  dispatch({
    type: 'GET_PUBLIC_NAME',
    name,
  });
};

export const getPublicGithub = () => async (dispatch) => {
  const returnedGithub = await store.getState().threeBoxData.threeBoxObject.public.get('github');
  const github = await returnedGithub;
  dispatch({
    type: 'GET_PUBLIC_GITHUB',
    github,
  });
};

export const getPublicImage = () => async (dispatch) => {
  const returnedImage = await store.getState().threeBoxData.threeBoxObject.public.get('image');
  const image = await returnedImage;
  dispatch({
    type: 'GET_PUBLIC_IMAGE',
    image,
  });
};

export const getPrivateEmail = () => async (dispatch) => {
  const returnedEmail = await store.getState().threeBoxData.threeBoxObject.private.get('email');
  const email = await returnedEmail;
  dispatch({
    type: 'GET_PRIVATE_EMAIL',
    email,
  });
};

export const getActivity = () => async (dispatch) => {
  dispatch({
    type: 'LOADING_ACTIVITY',
  });

  try {
    const returnedActivity = await ThreeBoxActivity.get(address); // eslint-disable-line no-undef
    const activity = await returnedActivity;

    // add datatype to each datum
    activity.internal = activity.internal.map(object => Object.assign({
      dataType: 'Internal',
    }, object));
    activity.txs = activity.txs.map(object => Object.assign({
      dataType: 'Txs',
    }, object));
    activity.token = activity.token.map(object => Object.assign({
      dataType: 'Token',
    }, object));

    const feed = activity.internal.concat(activity.txs).concat(activity.token);
    feed.sort((a, b) => b.timeStamp - a.timeStamp);

    // order feed chronologically and by address
    const feedByAddress = [];
    feed.map((item) => {
      const othersAddress = item.from === address ? item.to : item.from;
      if (feedByAddress.length > 0 && Object.keys(feedByAddress[feedByAddress.length - 1])[0] === othersAddress) {
        feedByAddress[feedByAddress.length - 1][othersAddress].push(item);
      } else {
        feedByAddress.push({
          [othersAddress]: [item],
        });
      }
    });

    console.log(feedByAddress)

    dispatch({
      type: 'GET_ACTIVITY',
      feedByAddress,
      ifFetchingActivity: false,
    });
  } catch (err) {
    dispatch({
      type: 'FAILED_LOADING_ACTIVITY',
      feedByAddress: [],
      ifFetchingActivity: false,
    });
  }
};

export const closeErrorModal = () => async (dispatch) => {
  dispatch({
    type: 'CLOSE_ERROR_MODAL',
    errorMessage: '',
    showErrorModal: false,
  });
};
