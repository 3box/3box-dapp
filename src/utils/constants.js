import * as routes from './routes';

const matchProtectedRoutes = (normalizedPath) => {
  if (normalizedPath === routes.PROFILE ||
    normalizedPath === routes.EDITPROFILE ||
    normalizedPath === routes.PROFILE_ABOUT ||
    normalizedPath === routes.PROFILE_ACTIVITY ||
    normalizedPath === routes.PROFILE_COLLECTIBLES) {
    return true;
  }
  return false;
};

export default matchProtectedRoutes;