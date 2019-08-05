import Box from '3box';

export default async function getPublicProfile(graphqlQueryObject) {
  let profile;
  try {
    profile = await Box.profileGraphQL(graphqlQueryObject);
  } catch (err) {
    return err;
  }
  return profile;
};