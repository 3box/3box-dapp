import {
  store,
} from '../../store';

const getMyMemberSince = async () => {
  try {
    const date = await store.getState().myData.box.public.get('memberSince');

    let memberSince;
    let memberSinceDate;

    if (date === 'Alpha') {
      memberSinceDate = date;
    } else if (date) {
      memberSince = new Date(date);
      memberSinceDate = `${(memberSince.getMonth() + 1)}/${memberSince.getDate()}/${memberSince.getFullYear()}`;
    }

    store.dispatch({
      type: 'MY_MEMBERSINCE_UPDATE',
      memberSince: memberSinceDate,
    });
  } catch (err) {
    console.error(err);
  }
};

export default getMyMemberSince;