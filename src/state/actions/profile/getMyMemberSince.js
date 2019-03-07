import {
  store,
} from '../../store';

const getMyMemberSince = () => async (dispatch) => {
  const date = await store.getState().threeBox.box.public.get('memberSince');

  let memberSince;
  let memberSinceDate;

  if (date === 'Alpha') {
    memberSinceDate = date;
  } else if (date) {
    memberSince = new Date(date);
    memberSinceDate = `${(memberSince.getMonth() + 1)}/${memberSince.getDate()}/${memberSince.getFullYear()}`;
  }

  dispatch({
    type: 'GET_PUBLIC_MEMBERSINCE',
    memberSince: memberSinceDate,
  });
};

export default getMyMemberSince;