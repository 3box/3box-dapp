import {
  store,
} from '../../store';

const getCollectibles = (address, onPublicProfile) => async (dispatch) => {
  const collection = [];

  try {
    const res = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&order_by=current_price&order_direction=asc&offset=0&limit=30`);
    const data = await res.json();
    collection.push(...data.assets);
  } catch (error) {
    console.log(error);
  }

  const collectiblesFavoritesToRender = [];
  const updatedCollectiblesFavorites = [];
  let collectiblesFavorites = [];

  if (onPublicProfile) {
    collectiblesFavorites = await store.getState().otherProfile.otherCollectiblesGallery;
  } else {
    collectiblesFavorites = await store.getState().myData.box.public.get('collectiblesFavorites');
  }

  if (collectiblesFavorites.length) {
    let tokenIdArray = '';
    collectiblesFavorites.forEach((nft, i) => {
      const isNotLast = i !== (collectiblesFavorites.length - 1);
      tokenIdArray = `${tokenIdArray}token_ids=${nft.token_id}${isNotLast ? '&' : ''}`;
    });

    try {
      const favoritesRes = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&${tokenIdArray}`);
      const favorites = await favoritesRes.json();
      collectiblesFavoritesToRender.push(...favorites.assets);
      favorites.assets.forEach((nft) => updatedCollectiblesFavorites.push({
        address: nft.address,
        token_id: nft.token_id,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  if (onPublicProfile) {
    dispatch({
      type: 'OTHER_FAVORITE_COLLECTIBLES_UPDATE',
      otherCollectiblesFavorites: collectiblesFavoritesToRender,
    });
  } else {
    if (collection && collection.length > 0) {
      dispatch({
        type: 'MY_COLLECTIBLES_UPDATE',
        collection,
      });
    }
    if (collectiblesFavorites && collectiblesFavorites.length > 0) {
      dispatch({
        type: 'MY_COLLECTIBLESFAVORITES_UPDATE',
        collectiblesFavorites,
        collectiblesFavoritesToRender,
      });
    }
  }

  dispatch({
    type: 'UI_COLLECTIBLES_LOADING',
    isFetchingCollectibles: false,
  });
};

export default getCollectibles;