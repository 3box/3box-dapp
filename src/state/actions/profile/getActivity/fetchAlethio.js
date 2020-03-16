const fetchAletio = async () => {
  let txs;
  let internal;
  let token;

  try {
    const txsData = await fetch(`https://api.aleth.io/v1/accounts/0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1/transactions?page[limit]=30`);
    if (txsData.status !== 200) {
      return console.error(`Looks like there was a problem. Status Code: ${txsData.status}`);
    }
    txs = await txsData.json();
    console.log('txstxstxs', txs);
  } catch (error) {
    console.log(error);
  }

  try {
    const internalData = await fetch(`https://api.aleth.io/v1/accounts/0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1/contractMessages?page[limit]=30`);
    if (internalData.status !== 200) {
      return console.error(`Looks like there was a problem. Status Code: ${internalData.status}`);
    }
    internal = await internalData.json();
    console.log('internalinternalinternal', internal);
  } catch (error) {
    console.log(error);
  }

  try {
    const tokenData = await fetch(`https://api.aleth.io/v1/accounts/0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1/tokenTransfers?page[limit]=30`);
    if (tokenData.status !== 200) {
      return console.error(`Looks like there was a problem. Status Code: ${tokenData.status}`);
    }
    token = await tokenData.json();
    console.log('tokentokentoken', token);
  } catch (error) {
    console.log(error);
  }

  const feed = {
    txs,
    internal,
    token,
  };

  return feed;
};

export default fetchAletio;