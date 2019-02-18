import React from 'react';
import PropTypes from 'prop-types';
import tokenToData from '../../utils/tokenToData.json';

import Save from '../../assets/Save.svg';
import Delete from '../../assets/Delete.svg';
import FeedTileContext from './FeedTileContext';
import Internal from '../../assets/Internal.svg';
import EthereumLine from '../../assets/EthereumLine.svg';
import Tokens from '../../assets/Tokens.svg';
import '../styles/Feed.css';
import networkArray from '../../utils/networkArray';
import '../styles/NetworkArray.css';
// import Send from '../../assets/Send.svg';
// import Receive from '../../assets/Receive.svg';

export const FeedTileActivity = ({ item, verifiedGithub, verifiedTwitter }) => (
  <div className="feed__activity">
    <div className="feed__activity__data">
      <div className="feed__activity__info">
        <img className="feed__activity__data__icon" src={item.op === 'PUT' ? Save : Delete} alt="Transaction Icon" />
        <p className="feed__activity__text">
          <span className="feed__activity__info__key">
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
          </span>

          {item.op === 'PUT' ? (
            <span className="feed__activity__info__value">
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

              {typeof item.value === 'string' && item.key !== 'emoji' && (item.key !== 'proof_github' && item.key !== 'proof_twitter')
                ? item.value : ''}
            </span>) : ''}
        </p>
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

export const FeedTileInternal = ({ item, name, onPublicProfilePage, metaDataName, isFromProfile, contractImg }) => (
  <a href={`https://etherscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer" className="feed__activity">
    <div className="feed__activity__data">

      <div className="feed__activity__info">
        {(item.tokenSymbol && (
          ((tokenToData[item.tokenSymbol])
            ? <img src={`/contractIcons/${tokenToData[item.tokenSymbol].logo}`} alt="token icon" className="feed__activity__data__icon" />
            : <img src={Internal} alt="Internal Transaction Icon" className="feed__activity__data__icon" />)
        ))}

        {(item.value === '0' && contractImg)
          && <img src={contractImg} alt="token icon" className="feed__activity__data__icon" />
        }

        {(item.value === '0' && !contractImg)
          && (
            <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`} className="feed__activity__data__icon">
              0x
          </div>
          )
        }

        {(item.value !== '0' && !item.tokenSymbol)
          && <img src={EthereumLine} alt="token icon" className="feed__activity__data__icon" />
        }
        <p className="feed__activity__text">
          <span className="feed__activity__info__key">
            {(onPublicProfilePage && item.value === '0') && (isFromProfile
              ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`)
            }
            {(!onPublicProfilePage && item.value === '0') && (isFromProfile
              ? 'You performed the action'
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`)
            }

            {(onPublicProfilePage && item.value !== '0') && (isFromProfile
              ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} sent`
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
            }
            {(!onPublicProfilePage && item.value !== '0') && (isFromProfile
              ? 'You sent'
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
            }
          </span>

          {item.value !== '0' && (
            <span className={`feed__activity__info__token ${isFromProfile ? 'sentCurrency' : 'receivedCurrency'}`} title={(Number(item.value) / 1000000000000000000).toString()}>
              {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ${item.tokenSymbol ? item.tokenSymbol : 'ETH'}`}
            </span>)}

          {item.value !== '0' && (
            <span className="feed__activity__info__key">
              {onPublicProfilePage && (isFromProfile
                ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
                : `to ${name || `${item.from.toLowerCase().substring(0, 12)}...`}`)
              }
              {!onPublicProfilePage && (isFromProfile
                ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
                : `to you`)
              }
            </span>)}

          {(item.methodCall && item.value !== '0') && (
            <span className="feed__activity__info__method">
              {`for ${item.methodCall}`}
            </span>
          )}
          {(item.methodCall && item.value === '0') && (
            <span className="feed__activity__info__method">
              {`${item.methodCall}`}
            </span>
          )}
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
  contractImg: PropTypes.string,
};

FeedTileInternal.defaultProps = {
  item: {},
  metaDataName: '',
  name: '',
  contractImg: '',
  onPublicProfilePage: false,
  isFromProfile: false,
};

export const FeedTileToken = ({ item, name, onPublicProfilePage, metaDataName, isFromProfile, contractImg }) => (
  <a href={`https://etherscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer" className="feed__activity">
    <div className="feed__activity__data">
      <div className="feed__activity__info">
        {
          (tokenToData[item.tokenSymbol])
            ? <img src={`/contractIcons/${tokenToData[item.tokenSymbol].logo}`} alt="token icon" className="feed__activity__data__icon" />
            : <img src={Tokens} alt="Token Transaction Icon" className="feed__activity__data__icon" />
        }
        {
          (item.value === '0' && contractImg)
          && <img src={contractImg} alt="token icon" className="feed__activity__data__icon" />
        }
        {
          (item.value === '0' && !contractImg)
          && (
            <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`} className="feed__activity__data__icon">
              0x
          </div>
          )
        }
        <p className="feed__activity__text">
          <span className="feed__activity__info__key">
            {(onPublicProfilePage && item.value === '0') && (isFromProfile
              ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`)
            }
            {(!onPublicProfilePage && item.value === '0') && (isFromProfile
              ? 'You performed the action'
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`)
            }

            {(onPublicProfilePage && item.value !== '0') && (isFromProfile
              ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} sent`
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
            }
            {(!onPublicProfilePage && item.value !== '0') && (isFromProfile
              ? 'You sent'
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
            }
          </span>
          {item.value !== '0' && (
            <span className={`feed__activity__info__token ${isFromProfile ? 'sentCurrency' : 'receivedCurrency'}`} title={(Number(item.value) / 1000000000000000000).toString()}>
              {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ${item.tokenSymbol ? item.tokenSymbol : 'Tokens'}`}
            </span>)}

          {item.value !== '0' && (
            <span className="feed__activity__info__key">
              {onPublicProfilePage && (isFromProfile
                ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
                : `to ${name || `${item.from.toLowerCase().substring(0, 12)}...`}`)
              }
              {!onPublicProfilePage && (isFromProfile
                ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
                : `to you`)
              }
            </span>)}
          {(item.methodCall && item.value !== '0') && (
            <span className="feed__activity__info__method">
              {`for ${item.methodCall}`}
            </span>
          )}
          {(item.methodCall && item.value === '0') && (
            <span className="feed__activity__info__method">
              {`${item.methodCall}`}
            </span>
          )}
        </p>
      </div>
      <FeedTileContext item={item} />
    </div>
  </a>
);

FeedTileToken.propTypes = {
  item: PropTypes.object,
  metaDataName: PropTypes.string,
  contractImgƒ: PropTypes.string,
  name: PropTypes.string,
  onPublicProfilePage: PropTypes.bool,
  isFromProfile: PropTypes.bool,
};

FeedTileToken.defaultProps = {
  item: {},
  metaDataName: '',
  contractImg: '',
  name: '',
  onPublicProfilePage: false,
  isFromProfile: false,
};

export const FeedTileTXS = ({ item, name, onPublicProfilePage, metaDataName, isFromProfile, contractImg }) => (
  <a href={`https://etherscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer" className="feed__activity">
    <div className="feed__activity__data">
      <div className="feed__activity__info">
        {
          (item.value === '0' && contractImg)
          && <img src={contractImg} alt="token icon" className="feed__activity__data__icon" />
        }
        {
          (item.value === '0' && !contractImg)
          && (
            <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`} className="feed__activity__data__icon">
              0x
            </div>)
        }
        {
          item.value !== '0'
          && <img src={EthereumLine} alt="Ethereum Transaction Icon" className="feed__activity__data__icon" />
        }
        <p className="feed__activity__text">
          <span className="feed__activity__info__key">
            {(onPublicProfilePage && item.value === '0') && (isFromProfile
              ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`)
            }
            {(!onPublicProfilePage && item.value === '0') && (isFromProfile
              ? 'You performed the action'
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`)
            }

            {(onPublicProfilePage && item.value !== '0') && (isFromProfile
              ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} sent`
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
            }
            {(!onPublicProfilePage && item.value !== '0') && (isFromProfile
              ? 'You sent'
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
            }
          </span>

          {item.value !== '0' && (
            <span className={`feed__activity__info__token ${isFromProfile ? 'sentCurrency' : 'receivedCurrency'}`} title={`${(Number(item.value) / 1000000000000000000).toString()} ETH`}>
              {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ETH`}
            </span>)}

          {item.value !== '0' && (
            <span className="feed__activity__info__key">
              {onPublicProfilePage && (isFromProfile
                ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
                : `to ${name || `${item.from.toLowerCase().substring(0, 12)}...`}`)
              }
              {!onPublicProfilePage && (isFromProfile
                ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
                : `to you`)
              }
            </span>)}

          {(item.methodCall && item.value !== '0') && (
            <span className="feed__activity__info__method">
              {`for ${item.methodCall}`}
            </span>
          )}
          {(item.methodCall && item.value === '0') && (
            <span className="feed__activity__info__method">
              {`${item.methodCall}`}
            </span>
          )}
        </p>
      </div>
      <FeedTileContext item={item} />
    </div>
  </a>
);

FeedTileTXS.propTypes = {
  item: PropTypes.object,
  metaDataName: PropTypes.string,
  contractImg: PropTypes.string,
  name: PropTypes.string,
  onPublicProfilePage: PropTypes.bool,
  isFromProfile: PropTypes.bool,
};

FeedTileTXS.defaultProps = {
  item: {},
  metaDataName: '',
  contractImg: '',
  name: '',
  onPublicProfilePage: false,
  isFromProfile: false,
};