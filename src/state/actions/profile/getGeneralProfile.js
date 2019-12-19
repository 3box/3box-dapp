import Box from '3box';

import {
  store,
} from '../../store';

const getGeneralProfile = async (address) => {
  try {
    const generalProfile = await Box.getProfile(address);

    let memberSince;
    let memberSinceDate;
    const date = generalProfile.memberSince;

    if (date === 'Alpha') {
      memberSinceDate = date;
    } else if (date) {
      memberSince = new Date(date);
      memberSinceDate = `${(memberSince.getMonth() + 1)}/${memberSince.getDate()}/${memberSince.getFullYear()}`;
    }

    store.dispatch({
      type: 'MY_GENERAL_PROFILE_UPDATE',
      name: generalProfile.name,
      description: generalProfile.description,
      image: generalProfile.image,
      coverPhoto: generalProfile.coverPhoto,
      location: generalProfile.location,
      website: generalProfile.website,
      employer: generalProfile.employer,
      job: generalProfile.job,
      school: generalProfile.school,
      degree: generalProfile.degree,
      major: generalProfile.major,
      year: generalProfile.year,
      emoji: generalProfile.emoji,
      birthday: generalProfile.birthday,
      collectiblesFavorites: generalProfile.collectiblesFavorites,
      memberSince: memberSinceDate,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getGeneralProfile;