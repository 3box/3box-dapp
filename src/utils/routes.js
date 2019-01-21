import {
  address,
} from './address';
import {
  normalizeURL,
} from './funcs';

export const LANDING = '/';
export const PRIVACY = '/privacy';
export const TERMS = '/terms';
export const JOBS = '/jobs';
export const CREATE = '/create';
export const PROFILES = '/profiles';

// PROFILE ROUTES
export const ACTIVITY = 'activity';
export const ABOUT = 'about';
export const EDIT = 'edit';

// BASE PROFILE, UNPROTECTED
export const PUBLIC_PROFILE = '/:ethaddress';

// FORMAT STRUCTURE FOR REACT ROUTER
export const FORMAT_PROFILE_ACTIVITY = `/:ethAddress/${ACTIVITY}`;
export const FORMAT_PROFILE_ABOUT = `/:ethAddress/${ABOUT}`;
export const FORMAT_PROFILE_EDIT = `/:ethAddress/${EDIT}`;

// PROTECTED ROUTES
export const LIVE_PROFILE_ACTIVITY = address ? `/${normalizeURL(address)}/${ACTIVITY}` : '';
export const LIVE_PROFILE_ABOUT = address ? `/${normalizeURL(address)}/${ABOUT}` : '';
export const LIVE_PROFILE_EDIT = address ? `/${normalizeURL(address)}/${EDIT}` : '';
