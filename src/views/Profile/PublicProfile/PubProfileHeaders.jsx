import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import image2base64 from 'image-to-base64';

class PubProfileHeaders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: '',
    };
  }

  componentDidMount() {
    const {
      otherImage,
    } = this.props;
    if (otherImage && otherImage[0]) this.getDataUri(`https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}`);
  }

  componentWillReceiveProps(nextProps) {
    const {
      otherImage,
    } = nextProps;
    if (otherImage && otherImage[0]) this.getDataUri(`https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}`);
  }


  getDataUri = async (url) => {
    const base64 = await image2base64(url);
    this.setState({ base64 });
    // console.log('ingetdatauri', uri);
    // return uri;
  };

  render() {
    const {
      otherName,
      otherProfileAddress,
      otherImage,
    } = this.props;

    const { base64 } = this.state;
    console.log('base64', base64);

    return (
      <Helmet>
        <title>{otherName || '3Box | Ethereum Profiles'}</title>
        <meta name="description" content={`3Box Profile for ${otherProfileAddress}`} />

        <meta property="og:description" content={`3Box Profile for ${otherProfileAddress}`} />
        <meta property="og:url" content={`https://test.3box.io/${otherProfileAddress}`} />
        <meta property="og:title" content={otherName || '3Box | Ethereum Profiles'} />
        {/* <meta property="og:image" content={`${otherImage ? `https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}` : ''}`} /> */}
        {/* <meta property="og:image" content={`${(otherImage && otherImage[0]) ? getDataUri(`https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}`) : ''}`} /> */}
        <meta property="og:image" content={base64} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@3boxdb" />
        <meta name="twitter:title" content={otherName || '3Box | Ethereum Profiles'} />
        <meta name="twitter:description" content={`3Box Profile for ${otherProfileAddress}`} />
        <meta name="twitter:image" content={base64} />
        {/* <meta name="twitter:image" content={`${(otherImage && otherImage[0]) ? getDataUri(`https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}`) : ''}`} /> */}
        {/* <meta name="twitter:image" content={`${otherImage ? `https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}` : ''}`} /> */}
      </Helmet>
    );
  }
}

export default PubProfileHeaders;

// export default React;

// const PubProfileHeaders = ({
//   otherName,
//   otherProfileAddress,
//   otherImage,
// }) => (
//     <Helmet>
//       <title>{otherName || '3Box | Ethereum Profiles'}</title>
//       <meta name="description" content={`3Box Profile for ${otherProfileAddress}`} />

//       <meta property="og:description" content={`3Box Profile for ${otherProfileAddress}`} />
//       <meta property="og:url" content={`https://test.3box.io/${otherProfileAddress}`} />
//       <meta property="og:title" content={otherName || '3Box | Ethereum Profiles'} />
//       {/* <meta property="og:image" content={`${otherImage ? `https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}` : ''}`} /> */}
//       <meta property="og:image" content={`${(otherImage && otherImage[0]) ? getDataUri(`https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}`) : ''}`} />

//       <meta name="twitter:card" content="summary" />
//       <meta name="twitter:site" content="@3boxdb" />
//       <meta name="twitter:title" content={otherName || '3Box | Ethereum Profiles'} />
//       <meta name="twitter:description" content={`3Box Profile for ${otherProfileAddress}`} />
//       <meta name="twitter:image" content={`${(otherImage && otherImage[0]) ? getDataUri(`https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}`) : ''}`} />
//       {/* <meta name="twitter:image" content={`${otherImage ? `https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}` : ''}`} /> */}
//     </Helmet>
//   );

