import ThreeBox from '3box';

const GET_THREEBOX = 'GET_THREEBOX';
const GET_PROFILE = 'GET_PROFILE';
const SET_PROFILE = 'SET_PROFILE';
const REMOVE_PROFILE = 'REMOVE_PROFILE';
const GET_PRIVATE = 'GET_PRIVATE';
const SET_PRIVATE = 'SET_PRIVATE';
const REMOVE_PRIVATE = 'REMOVE_PRIVATE';

const openBox = () => (dispatch) => {
  ThreeBox
    .openBox(web3.eth.accounts[0], web3.currentProvider) // eslint-disable-line no-undef
    .then((threeBox) => {
      const {
        profile,
      } = threeBox.profileStore;
      dispatch({
        type: GET_THREEBOX,
        threeBox,
        name: profile.name,
        github: profile.github,
        image: profile.image,
      });
    })
    .catch(error => console.log(error)); // eslint-disable-line no-console
};

export {
  openBox,
  GET_THREEBOX,
  GET_PROFILE,
  SET_PROFILE,
  REMOVE_PROFILE,
  GET_PRIVATE,
  SET_PRIVATE,
  REMOVE_PRIVATE,
};
