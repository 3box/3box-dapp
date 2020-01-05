import Box from '3box';

import {
  getFollowingProfiles,
} from '../../../utils/funcs';
import {
  followingSpaceName,
  followingThreadName,
} from '../../../utils/constants';
import fetchEns from '../utils';
import {
  store,
} from '../../store';

const getOtherProfile = async (profileAddress) => {
  try {
    store.dispatch({
      type: 'OTHER_PROFILE_LOADING',
      isLoadingOtherProfile: true,
    });

    const publicProfile = await Box.getProfile(profileAddress);
    const otherEns = await fetchEns(profileAddress);

    store.dispatch({
      type: 'OTHER_PROFILE_UPDATE',
      otherDescription: publicProfile.description,
      otherLocation: publicProfile.location,
      otherWebsite: publicProfile.website,
      otherMemberSince: publicProfile.memberSince,
      otherJob: publicProfile.job,
      otherSchool: publicProfile.school,
      otherDegree: publicProfile.degree,
      otherMajor: publicProfile.major,
      otherYear: publicProfile.year,
      otherEmployer: publicProfile.employer,
      otherCoverPhoto: publicProfile.coverPhoto,
      otherImage: publicProfile.image,
      otherName: publicProfile.name,
      otherEmoji: publicProfile.emoji,
      otherEns,
    });

    const publicVerifiedAccounts = Object.entries(publicProfile).length > 0 ?
      await Box.getVerifiedAccounts(publicProfile) : {
        github: null,
        twitter: null,
      };

    let profiles;
    try {
      profiles = await Box.getThread(followingSpaceName, followingThreadName, profileAddress, true);
    } catch (error) {
      console.error(error);
    }
    const otherFollowing = profiles ? await getFollowingProfiles(profiles) : [];

    otherFollowing.sort((a, b) => {
      if (!a[0].name) return -1;
      if (!b[0].name) return 1;
      if (a[0].name.toLowerCase() < b[0].name.toLowerCase()) return -1;
      if (a[0].name.toLowerCase() > b[0].name.toLowerCase()) return 1;
      return 0;
    });

    store.dispatch({
      type: 'OTHER_PROFILE_UPDATE_VERIFIED_FOLLOWING',
      otherGithub: publicVerifiedAccounts.github && publicVerifiedAccounts.github.username,
      otherTwitter: publicVerifiedAccounts.twitter && publicVerifiedAccounts.twitter.username,
      otherCollectiblesGallery: publicProfile.collectiblesFavorites,
      otherFollowing,
    });

    store.dispatch({
      type: 'OTHER_PROFILE_LOADING',
      isLoadingOtherProfile: false,
    });
  } catch (error) {
    store.dispatch({
      type: 'OTHER_PROFILE_LOADING',
      isLoadingOtherProfile: false,
    });
    console.error(error);
  }
};

export default getOtherProfile;