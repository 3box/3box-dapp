import Box from '3box';

import {
  store,
} from '../../store';

const getCollectibles = async (address, onPublicProfile) => {
  store.dispatch({
    type: 'UI_COLLECTIBLES_LOADING',
    isFetchingCollectibles: true,
  });

  let collection = [];

  try {
    const res = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&order_by=current_price&order_direction=asc&offset=0&limit=30`);
    const data = await res.json();
    console.log('collectiblescollection', collection);
    collection.push(...data.assets);
  } catch (error) {
    console.log(error);
  }

  // collectiblesFavoritesToRender includes all complete info from the opensea api
  // collectiblesFavorites only includes unique ids to save to 3box

  const collectiblesFavoritesToRender = [];
  const updatedCollectiblesFavorites = [];
  let collectiblesFavorites = [];

  if (onPublicProfile) {
    collectiblesFavorites = await store.getState().otherProfile.otherCollectiblesGallery;
  } else {
    collectiblesFavorites = await store.getState().myData.collectiblesFavorites;
  }

  if (collectiblesFavorites && collectiblesFavorites.length) {
    let tokenIdArray = '';
    collectiblesFavorites.forEach((nft, i) => {
      const isNotLast = i !== (collectiblesFavorites.length - 1);
      tokenIdArray = `${tokenIdArray}token_ids=${nft.token_id}${isNotLast ? '&' : ''}`;
    });

    try {
      const favoritesRes = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&${tokenIdArray}`);
      const favorites = await favoritesRes.json();
      console.log('favoritesRes', favorites);
      collectiblesFavoritesToRender.push(...favorites.assets);
      favorites.assets.forEach((nft) => updatedCollectiblesFavorites.push({
        address: nft.address,
        token_id: nft.token_id,
      }));
    } catch (error) {
      console.log(error);
    }

    collection = collection.filter((nft) => {
      const idx = collectiblesFavorites.findIndex((col) => {
        return (col.address === nft.asset_contract.address && col.token_id === nft.token_id);
      });
      if (idx === -1) return true;
      return false;
    });
  }

  if (onPublicProfile) {
    store.dispatch({
      type: 'OTHER_FAVORITE_COLLECTIBLES_UPDATE',
      otherCollectiblesFavorites: collectiblesFavoritesToRender,
    });
  } else {
    if (collection && collection.length > 0) {
      store.dispatch({
        type: 'MY_COLLECTIBLES_UPDATE',
        collection,
      });
    }
    if (collectiblesFavorites && collectiblesFavorites.length > 0) {
      store.dispatch({
        type: 'MY_COLLECTIBLESFAVORITES_UPDATE',
        collectiblesFavorites,
        collectiblesFavoritesToRender,
      });
    }
  }

  store.dispatch({
    type: 'UI_COLLECTIBLES_LOADING',
    isFetchingCollectibles: false,
  });
};

export default getCollectibles;