export const LANDING = '/';
export const PRIVACY = '/privacy';
export const TERMS = '/terms';
export const JOBS = '/jobs';
export const CREATE = '/create';
export const PROFILES = '/profiles';

// PROFILE ROUTES
export const ACTIVITY = 'activity';
export const DATA = 'data';
export const DETAILS = 'details';
export const EDIT = 'edit';
export const COLLECTIBLES = 'collectibles';

// BASE PROFILE, UNPROTECTED
// export const PUBLIC_PROFILE = "(^[/][0][xX]\w{40}\b)"

// FORMAT STRUCTURE FOR REACT ROUTER
export const FORMAT_PROFILE_ACTIVITY = `/:ethAddress/${ACTIVITY}`;
export const FORMAT_PROFILE_ABOUT = `/:ethAddress/${DETAILS}`;
export const FORMAT_PROFILE_DATA = `/:ethAddress/${DATA}`;
export const FORMAT_PROFILE_COLLECTIBLES = `/:ethAddress/${COLLECTIBLES}`;
export const FORMAT_PROFILE_EDIT = `/:ethAddress/${EDIT}`;

// PROTECTED ROUTES
// export const LIVE_PROFILE_ACTIVITY = store.getState().threeBox.currentAddress ? `/${normalizeURL(store.getState().threeBox.currentAddress)}/${ACTIVITY}` : '';
// export const LIVE_PROFILE_ABOUT = store.getState().threeBox.currentAddress ? `/${normalizeURL(store.getState().threeBox.currentAddress)}/${DETAILS}` : '';
// export const LIVE_PROFILE_EDIT = store.getState().threeBox.currentAddress ? `/${normalizeURL(store.getState().threeBox.currentAddress)}/${EDIT}` : '';