import React from 'react';
import { Helmet } from 'react-helmet';

const MyProfileHeaders = ({
  image,
  name,
  currentAddress,
}) => (
    <Helmet>
      <title>{name || '3Box | Ethereum Profiles'}</title>
      <meta name="description" content={`3Box Profile for ${currentAddress}`} />

      <meta property="og:description" content={`3Box Profile for ${currentAddress}`} />
      <meta property="og:url" content={`https://3box.io/${currentAddress}`} />
      <meta property="og:title" content={name || '3Box | Ethereum Profiles'} />
      <meta property="og:image" content={`${(image && image[0]) ? `https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}` : ''}`} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@3boxdb" />
      <meta name="twitter:title" content={name || '3Box | Ethereum Profiles'} />
      <meta name="twitter:description" content={`3Box Profile for ${currentAddress}`} />
      <meta name="twitter:image" content={`${(image && image[0]) ? `https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}` : ''}`} />
    </Helmet>
  );


export default MyProfileHeaders;
