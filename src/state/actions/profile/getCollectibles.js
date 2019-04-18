import {
  store,
} from '../../store';

const getCollectibles = (address, onPublicProfile) => async (dispatch) => {
  try {
    const res = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&order_by=current_price&order_direction=asc`);
    const data = await res.json();
    let collection = data.assets;

    const collectiblesFavoritesToRender = [];
    let updatedCollectiblesFavorites = [];
    let collectiblesFavorites = [];

    if (onPublicProfile) {
      collectiblesFavorites = await store.getState().otherProfile.otherCollectiblesGallery;
    } else {
      collectiblesFavorites = await store.getState().myData.box.public.get('collectiblesFavorites');
    }

    if (collectiblesFavorites && collectiblesFavorites.length > 0) {
      collection = collection.filter((nft) => {
        const idx = collectiblesFavorites.findIndex((col) => {
          return (col.address === nft.asset_contract.address && col.token_id === nft.token_id);
        });
        if (idx === -1) return true;
        collectiblesFavoritesToRender.push(nft);
        updatedCollectiblesFavorites.push({
          address: nft.asset_contract.address,
          token_id: nft.token_id,
        });
        return false;
      });

      if (collectiblesFavorites.length !== updatedCollectiblesFavorites.length && !onPublicProfile) {
        const {
          box,
        } = store.getState().threeBox;
        box.public.set('collectiblesFavorites', collectiblesFavorites);
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
          collectiblesFavorites: updatedCollectiblesFavorites,
          collectiblesFavoritesToRender,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export default getCollectibles;