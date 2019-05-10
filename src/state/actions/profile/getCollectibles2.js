import {
  store,
} from '../../store';

const getCollectibles = (address, onPublicProfile) => async (dispatch) => {
  try {
    let offset = 0;
    let collection = [];

    const checkAndGetMoreCollectibles = async (collectiblesArray) => {
      console.log('incount', collectiblesArray.length);
      if (collectiblesArray.length >= 100) {
        offset += 100;
        console.log('thisoffset', offset);
        const collectiblesRes = await fetch(`https://api.opensea.io/api/v1/assets?owner=${'0x68b42e44079d1d0a4a037e8c6ecd62c48967e69f'}&order_by=current_price&order_direction=asc&offset=${offset}&limit=100`);
        const collectiblesData = await collectiblesRes.json();
        console.log('secondcollectiblesData', collectiblesData);
        collection.push(collectiblesData.assets);
        if (offset === 700) return;
        checkAndGetMoreCollectibles(collectiblesData.assets);
      }
    };

    const res = await fetch(`https://api.opensea.io/api/v1/assets?owner=${'0x68b42e44079d1d0a4a037e8c6ecd62c48967e69f'}&order_by=current_price&order_direction=asc&offset=0&limit=100`);
    // const res = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&order_by=current_price&order_direction=asc`);
    const data = await res.json();
    console.log('collectiblesData', data);

    // const res2 = await fetch(`https://api.opensea.io/api/v1/assets?owner=${'0x68b42e44079d1d0a4a037e8c6ecd62c48967e69f'}&order_by=current_price&order_direction=asc&offset=95&limit=100`);
    // // const res = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&order_by=current_price&order_direction=asc`);
    // const data2 = await res2.json();
    // console.log('collectiblesData2', data2);
    // collection.push(data.assets);
    checkAndGetMoreCollectibles(data.assets);

    console.log('totalCollectibles', collection);

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
        } = store.getState().myData;
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