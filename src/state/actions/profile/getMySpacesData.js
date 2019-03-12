import Box from '3box';

const getMySpacesData = address => async (dispatch) => {
  try {
    const spaceData = {};

    // get list of spaces
    const spaces = await Box.listSpaces(address);

    // function to get space and pair to key
    const getSpace = async (spaceName) => {
      const space = await Box.getSpace(address, spaceName);
      spaceData[spaceName] = space;
    };

    // for each space
    const spaceDataPromise = async () => Promise
      .all(spaces.map(spaceName => getSpace(spaceName)));

    await spaceDataPromise();

    dispatch({
      type: 'MY_SPACES_DATA_UPDATE',
      spaces,
      spaceData,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getMySpacesData;