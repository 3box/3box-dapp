import React from 'react';
import { Helmet } from 'react-helmet';

const PubProfileHeaders = ({
  otherName,
  otherProfileAddress,
  otherImage,
}) => (
    <Helmet>
      <title>{otherName || '3Box | Ethereum Profiles'}</title>
      <meta name="description" content={`3Box Profile for ${otherProfileAddress}`} />

      <meta property="og:description" content={`3Box Profile for ${otherProfileAddress}`} />
      <meta property="og:url" content={`https://test.3box.io/${otherProfileAddress}`} />
      <meta property="og:title" content={otherName || '3Box | Ethereum Profiles'} />
      <meta property="og:image" content={`${otherImage ? `https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}` : ''}`} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@3boxdb" />
      <meta name="twitter:title" content={otherName || '3Box | Ethereum Profiles'} />
      <meta name="twitter:description" content={`3Box Profile for ${otherProfileAddress}`} />
      {/* <meta name="twitter:image" content="https://i.imgur.com/9YTMIoE.png" /> */}
    </Helmet>
  );

export default PubProfileHeaders;
