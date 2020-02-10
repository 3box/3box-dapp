import React from 'react';
import { Helmet } from 'react-helmet';

const AppHeaders = () => (
  <Helmet>
    <title>Shared backend for Web3 | 3Box</title>
    <meta name="description" content="One profile. A world of Ethereum dapps." />

    <meta property="og:type" content="website" />
    <meta property="og:description" content="One profile. A world of Ethereum dapps." />
    <meta property="og:url" content="https://3box.io/" />
    <meta property="og:title" content="Shared backend for Web3 | 3Box" />
    <meta property="og:image" content="https://i.imgur.com/o2kYS30.png" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@3boxdb" />
    <meta name="twitter:title" content="Shared backend for Web3 | 3Box" />
    <meta name="twitter:description" content="One profile. A world of Ethereum dapps." />
    <meta name="twitter:image" content="https://i.imgur.com/o2kYS30.png" />
  </Helmet>
);

export default AppHeaders;
