import Box from '3box';

import fetchEns from '../utils';

export default async function getPublicProfileAndENS(graphqlQueryObject, otherAddress) {
  try {
    const data = await Box.profileGraphQL(graphqlQueryObject) || {};
    const ensName = await fetchEns(otherAddress);
    data.profile.ensName = ensName;

    return data;
  } catch (err) {
    return err;
  }
}