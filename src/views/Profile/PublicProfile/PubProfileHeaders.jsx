import React from 'react';
import { Helmet } from 'react-helmet';

import { shortenEthAddr } from '../../../utils/funcs';

const PubProfileHeaders = ({
  otherName,
  otherProfileAddress,
  otherImage,
}) => (
    <Helmet>
      <title>{otherName ? `${otherName} on 3Box` : '3Box | Ethereum Profiles'}</title>
      <meta name="description" content={`Profile for ${shortenEthAddr(otherProfileAddress)}`} />

      <meta property="og:type" content="website" />
      <meta property="og:description" content={`Profile for ${shortenEthAddr(otherProfileAddress)}`} />
      <meta property="og:url" content={`https://3box.io/${otherProfileAddress}`} />
      <meta property="og:title" content={otherName ? `${otherName} on 3Box` : '3Box | Ethereum Profiles'} />
      <meta property="og:image" content={`${(otherImage && otherImage[0] && otherImage[0].contentUrl) ? `https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}` : 'https://i.imgur.com/RXJO8FD.png'}`} />

      <meta name="twitter:title" content={otherName ? `${otherName} on 3Box` : '3Box | Ethereum Profiles'} />
      <meta name="twitter:description" content={`Profile for ${otherProfileAddress}`} />
      <meta name="twitter:image" content={`${(otherImage && otherImage[0] && otherImage[0].contentUrl) ? `https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}` : 'https://i.imgur.com/RXJO8FD.png'}`} />
    </Helmet>
  );

export default PubProfileHeaders;
