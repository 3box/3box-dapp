import Box from '3box';

import {
  store,
} from '../../store';
import fetchEns from '../utils';

export default async function getPublicProfileAndENS(otherAddress) {
  try {
    const {
      fetchedProfiles,
    } = store.getState().myData;
    const updatedFetchedProfiles = fetchedProfiles || {};

    let profile;

    if (updatedFetchedProfiles[otherAddress] && updatedFetchedProfiles[otherAddress].ensNameFetched) {
      profile = updatedFetchedProfiles[otherAddress];
    } else {
      profile = await Box.getProfile(otherAddress) || {};
      const ensName = await fetchEns(otherAddress);
      profile.ensName = ensName;
      profile.ensNameFetched = true;

      updatedFetchedProfiles[otherAddress] = profile;
      store.dispatch({
        type: 'MY_FETCHED_PROFILES_UPDATE',
        fetchedProfiles: updatedFetchedProfiles,
      });
    }

    return profile;
  } catch (err) {
    console.log('There was an error fetching this profile');
    return null;
  }
}