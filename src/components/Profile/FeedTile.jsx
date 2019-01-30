import React from 'react';
import PropTypes from 'prop-types';

import { timeSince } from '../../utils/time';
import PrivateActivity from '../../assets/PrivateActivity.svg';
import Globe from '../../assets/Globe.svg';
import Save from '../../assets/Save.svg';
import Delete from '../../assets/Delete.svg';

import Internal from '../../assets/Internal.svg';
import EthereumLine from '../../assets/EthereumLine.svg';
import Send from '../../assets/Send.svg';
import Receive from '../../assets/Receive.svg';
import Tokens from '../../assets/Tokens.svg';

import '../styles/Feed.css';

export const FeedTileActivity = ({ item, verifiedGithub, verifiedTwitter }) => (
  <div className="feed__activity">
    <div className="feed__activity__data">
      <div className="feed__activity__info">
        <img src={item.op === 'PUT' ? Save : Delete} alt="Transaction Icon" />

        <p className="feed__activity__info__key">
          {` You 
        ${item.op === 'PUT' ? 'updated your' : 'removed your'}
        ${item.dataType === 'Private' ? 'private data' : ''}
        ${item.key === 'proof_github' ? 'Github username' : ''}
        ${item.key === 'proof_twitter' ? 'Twitter username' : ''}
        ${(item.key !== 'proof_twitter' ? item.key !== 'proof_github' : '')
              ? (item.key).replace(/([A-Z])/g, ' $1').trim().toLowerCase()
              : ''} 
            `}
          {item.op === 'PUT' ? 'to' : ''}
        </p>

        {item.op === 'PUT' ? (
          <p className="feed__activity__info__token">
            {(item.key === 'image' || item.key === 'coverPhoto')
              ? '' : ''}
            {item.dataType === 'Private'
              ? '*****' : ''}
            {item.key === 'emoji'
              ? (
                <span className="feed__activity__address__amount__emoji">
                  {typeof item.value === 'object' ? Object.keys(item.value)[0] : item.value}
                </span>
              ) : ''}
            {item.key === 'proof_github'
              ? verifiedGithub : ''}
            {item.key === 'proof_twitter'
              ? verifiedTwitter : ''}
            {typeof item.value === 'object'
              ? `${item.value ? Object.keys(item.value)[0] : '-----'}` : ''}
            {typeof item.value === 'string'
              ? item.value : ''}
          </p>) : ''}
      </div>
      <div className="feed__activity__metaData">
        <p className="feed__activity__address__time">
          {timeSince(item.timeStamp * 1000)}
        </p>
        {item.dataType === 'Private'
          ? <img src={PrivateActivity} alt="Transaction Icon" className="feed__activity__address__dataType" />
          : <img src={Globe} alt="Transaction Icon" className="feed__activity__address__dataType" />
        }
      </div>
    </div>

    {((item.key === 'image' || item.key === 'coverPhoto')
      && item.value
      && item.value.length > 0
      && item.value[0].contentUrl)
      ? (
        <img src={`https://ipfs.infura.io/ipfs/${item.value[0].contentUrl['/']}`} className="feed__activity__image clearProfPic" alt="profile" />
      ) : ''
    }
  </div>
);

FeedTileActivity.propTypes = {
  item: PropTypes.object,
  verifiedGithub: PropTypes.string,
  verifiedTwitter: PropTypes.string,
};

FeedTileActivity.defaultProps = {
  item: {},
  verifiedGithub: '',
  verifiedTwitter: '',
};

export const FeedTileInternal = ({ item, currentAddress, name, onPublicProfilePage, metaDataName }) => (
  <a href={`https://etherscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer" className="feed__activity">
    <div className="feed__activity__data">
      <div className="feed__activity__info">
        <img src={Internal} alt="Transaction Icon" />
        <p className="feed__activity__info__key">
          {onPublicProfilePage && (item.from.toLowerCase() === currentAddress.toLowerCase()
            ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} sent`
            : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
          }
          {!onPublicProfilePage && (item.from.toLowerCase() === currentAddress.toLowerCase()
            ? 'You sent'
            : 'sent you')
          }
        </p>
        <p className="feed__activity__address__amount" title={(Number(item.value) / 1000000000000000000).toString()}>
          {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ${item.tokenSymbol ? item.tokenSymbol : 'Tokens'}`}
        </p>
        <p className="feed__activity__info__key">
          {item.from.toLowerCase() === currentAddress.toLowerCase()
            ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
            : `to ${name || `${item.from.toLowerCase().substring(0, 12)}...`}`
          }
        </p>
        {/* <p className="feed__activity__info__token" title={item.tokenName}>
          {item.tokenName ? item.tokenName : 'Token'}
        </p> */}
      </div>
      <div className="feed__activity__metaData">
        <p className="feed__activity__address__time">
          {timeSince(item.timeStamp * 1000)}
        </p>
        {item.dataType === 'Private'
          ? <img src={PrivateActivity} alt="Transaction Icon" className="feed__activity__address__dataType" />
          : <img src={Globe} alt="Transaction Icon" className="feed__activity__address__dataType" />
        }
      </div>
    </div>
  </a>
);

FeedTileInternal.propTypes = {
  item: PropTypes.object,
  metaDataName: PropTypes.string,
  currentAddress: PropTypes.string,
  name: PropTypes.string,
  onPublicProfilePage: PropTypes.bool,
};

FeedTileInternal.defaultProps = {
  item: {},
  metaDataName: '',
  currentAddress: '',
  name: '',
  onPublicProfilePage: false,
};

export const FeedTileToken = ({ item, currentAddress, name, onPublicProfilePage, metaDataName }) => (
  <a href={`https://etherscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer" className="feed__activity">
    <div className="feed__activity__data">
      <div className="feed__activity__info">
        <img src={Tokens} alt="Transaction Icon" />
        <p className="feed__activity__info__key">
          {onPublicProfilePage && (item.from.toLowerCase() === currentAddress.toLowerCase()
            ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} sent`
            : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
          }
          {!onPublicProfilePage && (item.from.toLowerCase() === currentAddress.toLowerCase()
            ? 'You sent'
            : 'sent you')
          }
        </p>
        {/* <p className="feed__activity__info__token" title={item.tokenName}>
          {item.tokenName ? item.tokenName : 'Token'}
        </p> */}
        <p className="feed__activity__address__amount" title={(Number(item.value) / 1000000000000000000).toString()}>
          {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ${item.tokenSymbol ? item.tokenSymbol : 'Tokens'}`}
        </p>
        <p className="feed__activity__info__key">
          {item.from.toLowerCase() === currentAddress.toLowerCase()
            ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
            : `to ${name || `${item.from.toLowerCase().substring(0, 12)}...`}`
          }
        </p>
      </div>
      <div className="feed__activity__metaData">
        <p className="feed__activity__address__time">
          {timeSince(item.timeStamp * 1000)}
        </p>
        {item.dataType === 'Private'
          ? <img src={PrivateActivity} alt="Transaction Icon" className="feed__activity__address__dataType" />
          : <img src={Globe} alt="Transaction Icon" className="feed__activity__address__dataType" />
        }
      </div>
    </div>
  </a>
);

FeedTileToken.propTypes = {
  item: PropTypes.object,
  metaDataName: PropTypes.string,
  currentAddress: PropTypes.string,
  name: PropTypes.string,
  onPublicProfilePage: PropTypes.bool,
};

FeedTileToken.defaultProps = {
  item: {},
  metaDataName: '',
  currentAddress: '',
  name: '',
  onPublicProfilePage: false,
};

export const FeedTileTXS = ({ item, currentAddress, name, onPublicProfilePage, metaDataName }) => (
  <a href={`https://etherscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer" className="feed__activity">
    <div className="feed__activity__data">
      <div className="feed__activity__info">
        <img src={EthereumLine} alt="Transaction Icon" />
        <p className="feed__activity__info__key">
          {onPublicProfilePage && (item.from.toLowerCase() === currentAddress.toLowerCase()
            ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} sent`
            : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
          }
          {!onPublicProfilePage && (item.from.toLowerCase() === currentAddress.toLowerCase()
            ? 'You sent'
            : 'sent you')
          }
        </p>
        <p className="feed__activity__info__token" title={`${(Number(item.value) / 1000000000000000000).toString()} ETH`}>
          {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ETH`}
        </p>
        <p className="feed__activity__info__key">
          {item.from.toLowerCase() === currentAddress.toLowerCase()
            ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
            : `to ${name || `${item.from.toLowerCase().substring(0, 12)}...`}`
          }
        </p>
      </div>
      <div className="feed__activity__metaData">
        <p className="feed__activity__address__time">
          {timeSince(item.timeStamp * 1000)}
        </p>
        {item.dataType === 'Private'
          ? <img src={PrivateActivity} alt="Transaction Icon" className="feed__activity__address__dataType" />
          : <img src={Globe} alt="Transaction Icon" className="feed__activity__address__dataType" />
        }
      </div>
    </div>
  </a>
);

FeedTileTXS.propTypes = {
  item: PropTypes.object,
  metaDataName: PropTypes.string,
  currentAddress: PropTypes.string,
  name: PropTypes.string,
  onPublicProfilePage: PropTypes.bool,
};

FeedTileTXS.defaultProps = {
  item: {},
  metaDataName: '',
  currentAddress: '',
  name: '',
  onPublicProfilePage: false,
};

// ACTIVITY
// export const FeedTileActivity = ({ item, isEven, verifiedGithub, verifiedTwitter }) => (
//   <div className={`feed__activity ${isEven ? 'darkFeed' : 'lightFeed'}`}>
//     <div className="feed__activity__address__dataType">
//       {item.dataType === 'Private'
//         ? <img src={PrivateActivity} alt="Transaction Icon" className=" />
//         : <img src={Globe} alt="Transaction Icon" className=" />
//       }
//     </div>
//     <div className="feed__activity__address__toFrom saveDelete">
//       <img src={item.op === 'PUT' ? Save : Delete} alt="Transaction Icon" />
//       <p>
//         {item.op === 'PUT' ? 'Save' : 'Delete'}
//       </p>
//     </div>
//     <p className="feed__activity__address__function">
//       {item.dataType === 'Private'
//         ? 'Private'
//         : item.key === 'proof_github'
//           ? 'Github'
//           : item.key === 'proof_twitter'
//             ? 'Twitter'
//             : item.key && (item.key.charAt(0).toUpperCase() + item.key.slice(1)).replace(/([A-Z])/g, ' $1').trim()
//       }
//     </p>
//     <p className="feed__activity__address__amount">
//       {item.key === 'image' || item.key === 'coverPhoto'
//         ? (item.value && item.value.length > 0 && item.value[0].contentUrl)
//         && <img src={`https://ipfs.infura.io/ipfs/${item.value[0].contentUrl['/']}`} className="feed__activity__image clearProfPic" alt="profile" />
//         // ? <img src={Image} alt="Transaction Icon" className=" />
//         : item.dataType === 'Private'
//           ? '*****'
//           : item.key === 'emoji'
//             ? (
//               <span className="feed__activity__address__amount__emoji">
//                 {typeof item.value === 'object' ? Object.keys(item.value)[0] : item.value}
//               </span>
//             )
//             : item.key === 'proof_github'
//               ? verifiedGithub
//               : item.key === 'proof_twitter'
//                 ? verifiedTwitter
//                 : typeof item.value === 'object'
//                   ? `${item.value ? Object.keys(item.value)[0] : '-----'}`
//                   : item.value}
//     </p>
//     <p className="feed__activity__address__time">
//       {timeSince(item.timeStamp * 1000)}
//     </p>
//   </div>
// );



// TOKEN
{/* <div className="feed__activity">
{item.from === currentAddress
  ? (
    <div className="feed__activity__address__toFrom">
      <img src={Send} alt="Transaction Icon" />
      <p>
        Send
      </p>
    </div>
  )
  : (
    <div className="feed__activity__address__toFrom">
      <img src={Receive} alt="Transaction Icon" />
      <p>
        Receive
      </p>
    </div>
  )
}
<p className="feed__activity__address__function" title={item.tokenName}>
  {item.tokenName ? item.tokenName : 'Token'}
</p>
<p className="feed__activity__address__amount" title={(Number(item.value) / 1000000000000000000).toString()}>
  {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ${item.tokenSymbol ? item.tokenSymbol : 'Tokens'}`}
</p>

<div className="feed__activity__metaData">
  <p className="feed__activity__address__time">
    {timeSince(item.timeStamp * 1000)}
  </p>
  <img className="feed__activity__address__dataType" src={Tokens} alt="Token Icon" />
</div>
</div> */}


// TXS
{/* <div className="feed__activity">
{item.from === currentAddress
  ? (
    <div className="feed__activity__address__toFrom">
      <img src={Send} alt="Transaction Icon" />
      <p>
        Send
      </p>
    </div>
  )
  : (
    <div className="feed__activity__address__toFrom">
      <img src={Receive} alt="Transaction Icon" />
      <p>
        Receive
      </p>
    </div>
  )
}
<p className="feed__activity__address__function">
  Ethereum
</p>
<p className="feed__activity__address__amount" title={(Number(item.value) / 1000000000000000000).toString()}>
  {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ETH`}
</p>
<div className="feed__activity__metaData">
  <p className="feed__activity__address__time">
    {timeSince(item.timeStamp * 1000)}
  </p>
  <img src={EthereumLine} alt="Transaction Icon" className="feed__activity__address__dataType--ethereum feed__activity__address__dataType" />
</div>
</div> */}

// Internal
{/* <div className="feed__activity">
    {item.from === currentAddress
      ? (
        <div className="feed__activity__address__toFrom">
          <img src={Send} alt="Transaction Icon" />
          <p>
            Send
          </p>
        </div>
      )
      : (
        <div className="feed__activity__address__toFrom">
          <img src={Receive} alt="Transaction Icon" />
          <p>
            Receive
          </p>
        </div>
      )
    }
    <p className="feed__activity__address__function">
      {item.type && item.type.charAt(0).toUpperCase() + item.type.slice(1)}
    </p>
    <p className="feed__activity__address__amount" title={(Number(item.value) / 1000000000000000000).toString()}>
      {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ETH`}
    </p>

    <div className="feed__activity__metaData">
      <p className="feed__activity__address__time">
        {timeSince(item.timeStamp * 1000)}
      </p>
      <img src={Internal} alt="Transaction Icon" className="feed__activity__address__dataType" />
    </div>
  </div> */}


// : item.key && (item.key.charAt(0).toUpperCase() + item.key.slice(1)).replace(/([A-Z])/g, ' $1').trim()
// : item.key


// from activity tile
{/* {item.op === 'PUT' && (
            (item.key === 'image' || item.key === 'coverPhoto')
              ? ""
              : item.dataType === 'Private'
                ? '*****'
                : item.key === 'emoji'
                  ? (
                    <span className="feed__activity__address__amount__emoji">
                      {typeof item.value === 'object' ? Object.keys(item.value)[0] : item.value}
                    </span>
                  )
                  : item.key === 'proof_github'
                    ? verifiedGithub
                    : item.key === 'proof_twitter'
                      ? verifiedTwitter
                      : typeof item.value === 'object'
                        ? `${item.value ? Object.keys(item.value)[0] : '-----'}`
                        : item.value)} */}