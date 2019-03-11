import Box from '3box';

export default async function getPublicProfile(graphqlQueryObject) {
  let profile;
  try {
    profile = await Box.profileGraphQL(graphqlQueryObject); // eslint-disable-line no-undef
  } catch (err) {
    return err;
  }
  return profile;
};