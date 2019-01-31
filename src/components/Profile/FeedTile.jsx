import React from 'react';
import PropTypes from 'prop-types';
import contractMap from 'eth-contract-metadata';
import tokenToData from '../../utils/tokenToData.json';

import Save from '../../assets/Save.svg';
import Delete from '../../assets/Delete.svg';
import FeedTileContext from './FeedTileContext';
import Internal from '../../assets/Internal.svg';
import EthereumLine from '../../assets/EthereumLine.svg';
import Tokens from '../../assets/Tokens.svg';
import '../styles/Feed.css';
// import Send from '../../assets/Send.svg';
// import Receive from '../../assets/Receive.svg';

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
            ${(item.key !== 'proof_twitter' && item.key !== 'proof_github' && item.dataType !== 'Private')
              ? (item.key).replace(/([A-Z])/g, ' $1').trim().toLowerCase()
              : ''} 
            `}
          {item.op === 'PUT' ? 'to' : ''}
        </p>

        {item.op === 'PUT' ? (
          <p className="feed__activity__info__token">
            {(item.key === 'image' || item.key === 'coverPhoto')
              ? '' : ''}
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

            {(typeof item.value === 'object' && (item.key !== 'image' && item.key !== 'coverPhoto'))
              ? (item.value ? Object.keys(item.value)[0] : '-----')
              : ''}

            {typeof item.value === 'string' && (item.key !== 'proof_github' && item.key !== 'proof_twitter')
              ? item.value : ''}
          </p>) : ''}
      </div>
      <FeedTileContext item={item} />
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

export const FeedTileInternal = ({ item, name, onPublicProfilePage, metaDataName, isFromProfile }) => (
  <a href={`https://etherscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer" className="feed__activity">
    <div className="feed__activity__data">
      <div className="feed__activity__info">
        {
          (tokenToData[item.tokenSymbol])
            ? <img src={`/contractIcons/${tokenToData[item.tokenSymbol].logo}`} alt="token icon" />
            : <img src={Internal} alt="Internal Transaction Icon" />
        }
        <p className="feed__activity__info__key">
          {onPublicProfilePage && (isFromProfile
            ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} sent`
            : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
          }
          {!onPublicProfilePage && (isFromProfile
            ? 'You sent'
            : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
          }
        </p>
        <p className="feed__activity__address__amount" title={(Number(item.value) / 1000000000000000000).toString()}>
          {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ${item.tokenSymbol ? item.tokenSymbol : 'Tokens'}`}
        </p>
        <p className="feed__activity__info__key">
          {onPublicProfilePage && (isFromProfile
            ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
            : `to ${name || `${item.from.toLowerCase().substring(0, 12)}...`}`)
          }
          {!onPublicProfilePage && (isFromProfile
            ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
            : `to you`)
          }
        </p>
      </div>
      <FeedTileContext item={item} />
    </div>
  </a>
);

FeedTileInternal.propTypes = {
  item: PropTypes.object,
  metaDataName: PropTypes.string,
  name: PropTypes.string,
  onPublicProfilePage: PropTypes.bool,
  isFromProfile: PropTypes.bool,
};

FeedTileInternal.defaultProps = {
  item: {},
  metaDataName: '',
  name: '',
  onPublicProfilePage: false,
  isFromProfile: false,
};

export const FeedTileToken = ({ item, name, onPublicProfilePage, metaDataName, isFromProfile }) => (
  <a href={`https://etherscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer" className="feed__activity">
    <div className="feed__activity__data">
      <div className="feed__activity__info">
        {
          (tokenToData[item.tokenSymbol])
            ? <img src={`/contractIcons/${tokenToData[item.tokenSymbol].logo}`} alt="token icon" />
            : <img src={Tokens} alt="Token Transaction Icon" />
        }
        <p className="feed__activity__info__key">
          {onPublicProfilePage && (isFromProfile
            ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} sent`
            : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
          }
          {!onPublicProfilePage && (isFromProfile
            ? 'You sent'
            : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
          }
        </p>
        <p className="feed__activity__address__amount" title={(Number(item.value) / 1000000000000000000).toString()}>
          {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ${item.tokenSymbol ? item.tokenSymbol : 'Tokens'}`}
        </p>
        <p className="feed__activity__info__key">
          {onPublicProfilePage && (isFromProfile
            ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
            : `to ${name || `${item.from.toLowerCase().substring(0, 12)}...`}`)
          }
          {!onPublicProfilePage && (isFromProfile
            ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
            : `to you`)
          }
        </p>
      </div>
      <FeedTileContext item={item} />
    </div>
  </a>
);

FeedTileToken.propTypes = {
  item: PropTypes.object,
  metaDataName: PropTypes.string,
  name: PropTypes.string,
  onPublicProfilePage: PropTypes.bool,
  isFromProfile: PropTypes.bool,
};

FeedTileToken.defaultProps = {
  item: {},
  metaDataName: '',
  name: '',
  onPublicProfilePage: false,
  isFromProfile: false,
};

export const FeedTileTXS = ({ item, name, onPublicProfilePage, metaDataName, isFromProfile }) => (
  <a href={`https://etherscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer" className="feed__activity">
    <div className="feed__activity__data">
      <div className="feed__activity__info">
        <img src={EthereumLine} alt="Ethereum Transaction Icon" />
        <p className="feed__activity__info__key">
          {onPublicProfilePage && (isFromProfile
            ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} sent`
            : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
          }
          {!onPublicProfilePage && (isFromProfile
            ? 'You sent'
            : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
          }
        </p>
        <p className="feed__activity__info__token" title={`${(Number(item.value) / 1000000000000000000).toString()} ETH`}>
          {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ETH`}
        </p>
        <p className="feed__activity__info__key">
          {onPublicProfilePage && (isFromProfile
            ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
            : `to ${name || `${item.from.toLowerCase().substring(0, 12)}...`}`)
          }
          {!onPublicProfilePage && (isFromProfile
            ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
            : `to you`)
          }
        </p>
      </div>
      <FeedTileContext item={item} />
    </div>
  </a>
);

FeedTileTXS.propTypes = {
  item: PropTypes.object,
  metaDataName: PropTypes.string,
  name: PropTypes.string,
  onPublicProfilePage: PropTypes.bool,
  isFromProfile: PropTypes.bool,
};

FeedTileTXS.defaultProps = {
  item: {},
  metaDataName: '',
  name: '',
  onPublicProfilePage: false,
  isFromProfile: false,
};