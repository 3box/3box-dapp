export default function (state = null, action) {
  switch (action.type) {
    case 'NAME_UPDATED':
      return action.payload;
    default:
      throw new Error('Error with user');
  }
}
