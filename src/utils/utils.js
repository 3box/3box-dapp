import * as routes from './routes';
import history from '../history';

export const checkForOnBoarding = (dispatch, feed) => {
  const checkIfNewUser = feedItem => !!feedItem.threeBox;
  console.log(feed);
  if (!feed.some(checkIfNewUser)) {
    dispatch({
      type: 'HANDLE_ONBOARDING_MODAL',
      onBoardingModal: true,
    });
    history.push(routes.EDITPROFILE);
  }
}