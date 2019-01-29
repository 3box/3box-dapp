import React from 'react';
import PropTypes from 'prop-types';

import { timeSince } from '../utils/time';
import PrivateActivity from '../assets/PrivateActivity.svg';
import Globe from '../assets/Globe.svg';
import Image from '../assets/Image.svg';
import Save from '../assets/Save.svg';
import Delete from '../assets/Delete.svg';

import Internal from '../assets/Internal.svg';
import EthereumLine from '../assets/EthereumLine.svg';
import Send from '../assets/Send.svg';
import Receive from '../assets/Receive.svg';
import Tokens from '../assets/Tokens.svg';

import './styles/Feed.css';

export const FeedTileActivity = ({ item, isEven, verifiedGithub, verifiedTwitter }) => (
  <div className={`feed__activity___data ${isEven ? 'darkFeed' : 'lightFeed'}`}>
    <div className="feed__activity__address__dataType">
      {item.dataType === 'Private'
        ? <img src={PrivateActivity} alt="Transaction Icon" className="feed__activity__address__amount__image" />
        : <img src={Globe} alt="Transaction Icon" className="feed__activity__address__amount__image" />
      }
    </div>
    <div className="feed__activity__address__toFrom saveDelete">
      <img src={item.op === 'PUT' ? Save : Delete} alt="Transaction Icon" />
      <p>
        {item.op === 'PUT' ? 'Save' : 'Delete'}
      </p>
    </div>
    <p className="feed__activity__address__function">
      {item.dataType === 'Private'
        ? 'Private'
        : item.key === 'proof_github'
          ? 'Github'
          : item.key === 'proof_twitter'
            ? 'Twitter'
            : item.key && (item.key.charAt(0).toUpperCase() + item.key.slice(1)).replace(/([A-Z])/g, ' $1').trim()
      }
    </p>
    <p className="feed__activity__address__amount">
      {item.key === 'image' || item.key === 'coverPhoto'
        ? <img src={Image} alt="Transaction Icon" className="feed__activity__address__amount__image" />
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
                  : item.value}
    </p>
    <p className="feed__activity__address__time">
      {timeSince(item.timeStamp * 1000)}
    </p>
  </div>
);

FeedTileActivity.propTypes = {
  item: PropTypes.object,
  isEven: PropTypes.bool,
  verifiedGithub: PropTypes.string,
  verifiedTwitter: PropTypes.string,
};

FeedTileActivity.defaultProps = {
  item: {},
  isEven: false,
  verifiedGithub: '',
  verifiedTwitter: '',
};

export const FeedTileInternal = ({ item, isEven, currentAddress }) => (
  <div className={`feed__activity___data ${isEven ? 'darkFeed' : 'lightFeed'}`}>
    <div className="feed__activity__address__dataType">
      <img src={Internal} alt="Transaction Icon" />
    </div>
    {item.from.toLowerCase() === currentAddress.toLowerCase()
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
    <p className="feed__activity__address__time">
      {timeSince(item.timeStamp * 1000)}
    </p>
  </div>
);

FeedTileInternal.propTypes = {
  item: PropTypes.object,
  isEven: PropTypes.bool,
};

FeedTileInternal.defaultProps = {
  item: {},
  isEven: false,
};

export const FeedTileToken = ({ item, isEven, currentAddress }) => (
  <div className={`feed__activity___data ${isEven ? 'darkFeed' : 'lightFeed'}`}>
    <div className="feed__activity__address__dataType">
      <img src={Tokens} alt="Token Icon" />
    </div>
    {item.from.toLowerCase() === currentAddress.toLowerCase()
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
    <p className="feed__activity__address__time">
      {timeSince(item.timeStamp * 1000)}
    </p>
  </div>
);

FeedTileToken.propTypes = {
  item: PropTypes.object,
  isEven: PropTypes.bool,
};

FeedTileToken.defaultProps = {
  item: {},
  isEven: false,
};

export const FeedTileTXS = ({ item, isEven, currentAddress }) => (
  <div className={`feed__activity___data ${isEven ? 'darkFeed' : 'lightFeed'}`}>
    <div className="feed__activity__address__dataType">
      <img src={EthereumLine} alt="Transaction Icon" className="feed__activity__address__dataType--ethereum" />
    </div>
    {item.from.toLowerCase() === currentAddress.toLowerCase()
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
    <p className="feed__activity__address__time">
      {timeSince(item.timeStamp * 1000)}
    </p>
  </div>
);

FeedTileTXS.propTypes = {
  item: PropTypes.object,
  isEven: PropTypes.bool,
};

FeedTileTXS.defaultProps = {
  item: {},
  isEven: false,
};
