export const ABOUT = '/about';
export const LANDING = '/';
export const PROFILE = '/profile';
export const PROFILE_ACTIVITY = '/profile/activity';
export const PROFILE_ABOUT = '/profile/about';
export const PROFILE_COLLECTIBLES = '/profile/collectibles';
export const PROFILE_ALL = '/profile*';

export const EDITPROFILE = '/edit';
export const PRIVACY = '/privacy';
export const TERMS = '/terms';
export const JOBS = '/jobs';
export const CREATE = '/create';
export const PROFILES = '/profiles';

// public profile routes
export const PUBLIC_BASE = '/user';

export const PUBLIC_ACTIVITY_ROUTE = '/activity';
export const PUBLIC_DETAILS_ROUTE = '/details';

export const PUBLIC_PROFILE = `${PUBLIC_BASE}/:ethaddress`;
export const PUBLIC_ACTIVITY = `${PUBLIC_BASE}/:ethaddress${PUBLIC_ACTIVITY_ROUTE}`;
export const PUBLIC_DETAILS = `${PUBLIC_BASE}/:ethaddress${PUBLIC_DETAILS_ROUTE}`;
