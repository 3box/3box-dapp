import * as routes from './routes';
import history from '../history';

export const checkForOnBoarding = (dispatch, feed) => {
  const checkIfNewUser = feedItem => !!feedItem.threeBox;
  if (!feed.some(checkIfNewUser)) {
    dispatch({
      type: 'HANDLE_ONBOARDING_MODAL',
      onBoardingModal: true,
    });
    history.push(routes.EDITPROFILE);
  } else {
    dispatch({
      type: 'HANDLE_ONBOARDING_MODAL',
      onBoardingModal: false,
    });
  }
}