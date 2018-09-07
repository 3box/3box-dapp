// add functions to update user profile here
// add functions to get user profile here

export default function (state = null, action) {
  switch (action.type) {
    case 'NAME_UPDATED':
      return action.payload;
    default:
      return state;
  }
}
