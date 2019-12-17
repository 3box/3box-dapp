import {
  store,
} from '../../store';

const getVerifiedPrivateEmail = () => async (dispatch) => {
  try {
    const verifiedEmail = await store.getState().myData.box.verified.email();

    dispatch({
      type: 'MY_VERIFIED_EMAIL_UPDATE',
      verifiedEmail: verifiedEmail && verifiedEmail.email_address,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getVerifiedPrivateEmail;