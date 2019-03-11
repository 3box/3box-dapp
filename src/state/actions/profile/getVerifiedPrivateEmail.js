import {
  store,
} from '../../store';

const getVerifiedPrivateEmail = () => async (dispatch) => {
  try {
    const verifiedEmail = await store.getState().myData.box.verified.email();

    dispatch({
      type: 'GET_VERIFIED_PRIVATE_EMAIL',
      verifiedEmail: verifiedEmail.email_address,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getVerifiedPrivateEmail;