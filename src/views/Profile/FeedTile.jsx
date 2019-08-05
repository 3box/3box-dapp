import React from 'react';
import PropTypes from 'prop-types';
import tokenToData from '../../utils/tokenToData.json';

import Save from '../../assets/Save.svg';
import Delete from '../../assets/Delete.svg';
import FeedTileContext from './FeedTileContext';
import Internal from '../../assets/Internal.svg';
import EthereumLine from '../../assets/EthereumLine.svg';
import Tokens from '../../assets/Tokens.svg';
import './styles/Feed.css';
import networkArray from '../../utils/networkArray';
import '../../components/styles/NetworkArray.css';

const contractImgJSX = ({ contractImg }) => <img src={contractImg} alt="token icon" className="feed__activity__data__icon" />;
contractImgJSX.propTypes = {
  contractImg: PropTypes.string,
};
contractImgJSX.defaultProps = {
  contractImg: '',
};

const EthereumIcon = () => (
  <div className={`feed__activity__context__network feed__activity__data__icon ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
    0x
  </div>
);

export const FeedTileActivity = (props) => {
  const {
    item,
    verifiedGithub,
    verifiedTwitter,
    verifiedEmail,
  } = props;

  const action = item.op === 'PUT' ? 'updated your' : 'removed your';
  const dataType = (item.dataType === 'Private' && item.key !== 'proof_email') ? 'private data' : '';
  const isGithub = item.key === 'proof_github' && 'Github username';
  const isEmail = item.key === 'proof_email' && 'private email address';
  const isTwitter = item.key === 'proof_twitter' && 'Twitter username';
  const verifiedField = isGithub || isEmail || isTwitter || '';
  const nonVerifiedField = (!verifiedField && item.dataType !== 'Private' && item.key) ? item.key.replace(/([A-Z])/g, ' $1').trim().toLowerCase() : '';
  const feedText = ` You ${action} ${dataType} ${verifiedField} ${nonVerifiedField}`;

  const isImageValue = (item.key === 'image' || item.key === 'coverPhoto') && '';
  const isEmojiValue = item.key === 'emoji';
  const isGithubValue = item.key === 'proof_github' && verifiedGithub;
  const isTwitterValue = item.key === 'proof_twitter' && verifiedTwitter;
  const isEmailValue = item.key === 'proof_email' && verifiedEmail;
  const isPrivateValue = (typeof item.value === 'object' && (item.key !== 'image' && item.key !== 'coverPhoto'))
    && (item.value ? Object.keys(item.value)[0] : '-----');
  const restValue = typeof item.value === 'string' && item.key !== 'emoji' && (!verifiedField)
    && item.value;
  const whichValue =
    isImageValue ||
    isGithubValue ||
    isTwitterValue ||
    isEmailValue ||
    isPrivateValue ||
    restValue ||
    '';
  const valueClass = isEmojiValue ? 'feed__activity__address__amount__emoji' : 'feed__activity__info__value';
  const valueToRender = isEmojiValue ? (typeof item.value === 'object' ? Object.keys(item.value)[0] : item.value) : whichValue;

  const updatedImage =
    (item.key === 'image' || item.key === 'coverPhoto')
    && item.value
    && item.value.length > 0
    && item.value[0].contentUrl;

  return (
    <div className="feed__activity">
      <div className="feed__activity__data">
        <div className="feed__activity__info">
          <img className="feed__activity__data__icon" src={item.op === 'PUT' ? Save : Delete} alt="Transaction Icon" />
          <p className="feed__activity__text">
            <span className="feed__activity__info__key">
              {`${feedText} `}
              {(item.op === 'PUT' && item.key === 'proof_email' && verifiedEmail) ? 'to' : ''}
              {(item.op === 'PUT' && item.key === 'proof_twitter' && verifiedTwitter) ? 'to' : ''}
              {(item.op === 'PUT' && item.key === 'proof_github' && verifiedGithub) ? 'to' : ''}
              {(item.op === 'PUT' && item.key !== 'proof_github' && item.key !== 'proof_twitter' && item.key !== 'proof_email') ? 'to' : ''}
            </span>

            <span className={valueClass}>
              {valueToRender}
            </span>
          </p>
        </div>
        <FeedTileContext item={item} />
      </div>

      {updatedImage ? (
        <img
          src={`https://ipfs.infura.io/ipfs/${item.value[0].contentUrl['/']}`}
          className="feed__activity__image clearProfPic"
          alt="profile"
        />
      ) : ''}
    </div>
  );
};

FeedTileActivity.propTypes = {
  item: PropTypes.object,
  verifiedGithub: PropTypes.string,
  verifiedTwitter: PropTypes.string,
  verifiedEmail: PropTypes.string,
};

FeedTileActivity.defaultProps = {
  item: {},
  verifiedGithub: '',
  verifiedTwitter: '',
  verifiedEmail: '',
};

export const FeedTileInternal = (props) => {
  const {
    item,
    name,
    onOtherProfilePage,
    metaDataName,
    isFromProfile,
    contractImg,
  } = props;

  const fromAddress = item.from && `${item.from.toLowerCase().substring(0, 12)}...`;
  const toAddress = `${item.to.toLowerCase().substring(0, 12)}...`;
  const isValueZero = item.value === '0';

  return (
    <a href={`https://etherscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer" className="feed__activity">
      <div className="feed__activity__data">

        <div className="feed__activity__info">
          {(item.tokenSymbol && (
            ((tokenToData[item.tokenSymbol])
              ? <img src={`/contractIcons/${tokenToData[item.tokenSymbol].logo}`} alt="token icon" className="feed__activity__data__icon" />
              : <img src={Internal} alt="Internal Transaction Icon" className="feed__activity__data__icon" />)
          ))}

          {(isValueZero && contractImg) && <contractImgJSX contractImg={contractImg} />}
          {(isValueZero && !contractImg) && <EthereumIcon />}
          {(item.value !== '0' && !item.tokenSymbol) && <img src={EthereumLine} alt="token icon" className="feed__activity__data__icon" />}

          <p className="feed__activity__text">
            <span className="feed__activity__info__key">
              {(onOtherProfilePage && isValueZero) && (
                isFromProfile
                  ? `${name || fromAddress} performed the action`
                  : `${metaDataName || fromAddress} performed the action`)
              }

              {(!onOtherProfilePage && isValueZero) && (
                isFromProfile
                  ? 'You performed the action'
                  : `${metaDataName || fromAddress} performed the action`)
              }

              {(onOtherProfilePage && item.value !== '0') && (
                isFromProfile
                  ? `${name || fromAddress} sent`
                  : `${metaDataName || fromAddress} sent`)
              }

              {(!onOtherProfilePage && item.value !== '0') && (
                isFromProfile
                  ? 'You sent'
                  : `${metaDataName || fromAddress} sent`)
              }
            </span>

            {!isValueZero && (
              <span className={`feed__activity__info__token ${isFromProfile ? 'sentCurrency' : 'receivedCurrency'}`} title={(Number(item.value) / 1000000000000000000).toString()}>
                {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ${item.tokenSymbol ? item.tokenSymbol : 'ETH'}`}
              </span>
            )}

            {!isValueZero && (
              <span className="feed__activity__info__key">
                {onOtherProfilePage && (
                  isFromProfile
                    ? `to ${metaDataName || toAddress}`
                    : `to ${name || fromAddress}`)
                }
                {!onOtherProfilePage && (
                  isFromProfile
                    ? `to ${metaDataName || toAddress}`
                    : 'to you')
                }
              </span>
            )}

            {(item.methodCall && !isValueZero) && (
              <span className="feed__activity__info__method">
                {`for ${item.methodCall}`}
              </span>
            )}
            {(item.methodCall && isValueZero) && (
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
};

FeedTileInternal.propTypes = {
  item: PropTypes.object,
  metaDataName: PropTypes.string,
  name: PropTypes.string,
  onOtherProfilePage: PropTypes.bool,
  isFromProfile: PropTypes.bool,
  contractImg: PropTypes.string,
};

FeedTileInternal.defaultProps = {
  item: {},
  metaDataName: '',
  name: '',
  contractImg: '',
  onOtherProfilePage: false,
  isFromProfile: false,
};

export const FeedTileToken = (props) => {
  const {
    item,
    name,
    onOtherProfilePage,
    metaDataName,
    isFromProfile,
    contractImg,
  } = props;

  const fromAddress = item.from && `${item.from.toLowerCase().substring(0, 12)}...`;
  const toAddress = `${item.to.toLowerCase().substring(0, 12)}...`;
  const isValueZero = item.value === '0';

  return (
    <a href={`https://etherscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer" className="feed__activity">
      <div className="feed__activity__data">
        <div className="feed__activity__info">
          {
            (tokenToData[item.tokenSymbol])
              ? <img src={`/contractIcons/${tokenToData[item.tokenSymbol].logo}`} alt="token icon" className="feed__activity__data__icon" />
              : <img src={Tokens} alt="Token Transaction Icon" className="feed__activity__data__icon" />
          }

          {(isValueZero && contractImg) && <contractImgJSX contractImg={contractImg} />}
          {(isValueZero && !contractImg && !tokenToData[item.tokenSymbol]) && <EthereumIcon />}

          <p className="feed__activity__text">
            <span className="feed__activity__info__key">
              {(onOtherProfilePage && isValueZero) && (isFromProfile
                ? `${name || fromAddress} performed the action`
                : `${metaDataName || fromAddress} performed the action`)
              }

              {(!onOtherProfilePage && isValueZero) && (isFromProfile
                ? 'You performed the action'
                : `${metaDataName || fromAddress} performed the action`)
              }

              {(onOtherProfilePage && !isValueZero) && (isFromProfile
                ? `${name || fromAddress} sent`
                : `${metaDataName || fromAddress} sent`)
              }

              {(!onOtherProfilePage && !isValueZero) && (isFromProfile
                ? 'You sent'
                : `${metaDataName || fromAddress} sent`)
              }
            </span>

            {!isValueZero && (
              <span className={`feed__activity__info__token ${isFromProfile ? 'sentCurrency' : 'receivedCurrency'}`} title={(Number(item.value) / 1000000000000000000).toString()}>
                {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ${item.tokenSymbol ? item.tokenSymbol : 'Tokens'}`}
              </span>
            )}

            {!isValueZero && (
              <span className="feed__activity__info__key">
                {onOtherProfilePage && (isFromProfile
                  ? `to ${metaDataName || toAddress}`
                  : `to ${name || fromAddress}`)
                }
                {!onOtherProfilePage && (isFromProfile
                  ? `to ${metaDataName || toAddress}`
                  : 'to you')
                }
              </span>
            )}
            {(item.methodCall && !isValueZero) && (
              <span className="feed__activity__info__method">
                {`for ${item.methodCall}`}
              </span>
            )}
            {(item.methodCall && isValueZero) && (
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
};

FeedTileToken.propTypes = {
  item: PropTypes.object,
  metaDataName: PropTypes.string,
  contractImg: PropTypes.string,
  name: PropTypes.string,
  onOtherProfilePage: PropTypes.bool,
  isFromProfile: PropTypes.bool,
};

FeedTileToken.defaultProps = {
  item: {},
  metaDataName: '',
  contractImg: '',
  name: '',
  onOtherProfilePage: false,
  isFromProfile: false,
};

export const FeedTileTXS = (props) => {
  const {
    item,
    name,
    onOtherProfilePage,
    metaDataName,
    isFromProfile,
    contractImg,
  } = props;

  const fromAddress = `${item.from.toLowerCase().substring(0, 12)}...`;
  const toAddress = `${item.to.toLowerCase().substring(0, 12)}...`;
  const isValueZero = item.value === '0';

  return (
    <a href={`https://etherscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer" className="feed__activity">
      <div className="feed__activity__data">
        <div className="feed__activity__info">

          {(isValueZero && contractImg) && <contractImgJSX contractImg={contractImg} />}
          {(isValueZero && !contractImg) && <EthereumIcon />}
          {!isValueZero && <img src={EthereumLine} alt="Ethereum Transaction Icon" className="feed__activity__data__icon" />}

          <p className="feed__activity__text">
            <span className="feed__activity__info__key">
              {(onOtherProfilePage && isValueZero) && (isFromProfile
                ? `${name || fromAddress} performed the action`
                : `${metaDataName || fromAddress} performed the action`)
              }
              {(!onOtherProfilePage && isValueZero) && (isFromProfile
                ? 'You performed the action'
                : `${metaDataName || fromAddress} performed the action`)
              }

              {(onOtherProfilePage && !isValueZero) && (isFromProfile
                ? `${name || fromAddress} sent`
                : `${metaDataName || fromAddress} sent`)
              }
              {(!onOtherProfilePage && !isValueZero) && (isFromProfile
                ? 'You sent'
                : `${metaDataName || fromAddress} sent`)
              }
            </span>

            {!isValueZero && (
              <span className={`feed__activity__info__token ${isFromProfile ? 'sentCurrency' : 'receivedCurrency'}`} title={`${(Number(item.value) / 1000000000000000000).toString()} ETH`}>
                {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ETH`}
              </span>
            )}

            {!isValueZero && (
              <span className="feed__activity__info__key">
                {onOtherProfilePage && (isFromProfile
                  ? `to ${metaDataName || toAddress}`
                  : `to ${name || fromAddress}`)
                }
                {!onOtherProfilePage && (isFromProfile
                  ? `to ${metaDataName || toAddress}`
                  : 'to you')
                }
              </span>
            )}

            {(item.methodCall && !isValueZero) && (
              <span className="feed__activity__info__method">
                {`for ${item.methodCall}`}
              </span>
            )}

            {(item.methodCall && isValueZero) && (
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
};

FeedTileTXS.propTypes = {
  item: PropTypes.object,
  metaDataName: PropTypes.string,
  contractImg: PropTypes.string,
  name: PropTypes.string,
  onOtherProfilePage: PropTypes.bool,
  isFromProfile: PropTypes.bool,
};

FeedTileTXS.defaultProps = {
  item: {},
  metaDataName: '',
  contractImg: '',
  name: '',
  onOtherProfilePage: false,
  isFromProfile: false,
};


export const FeedTileSpace = ({ item }) => (
  <div className="feed__activity">
    <div className="feed__activity__data">
      <div className="feed__activity__info">
        <img className="feed__activity__data__icon" src={Save} alt="Transaction Icon" />
        <p className="feed__activity__text">
          You updated
          <span className="feed__activity__info__key--space">
            {` ${item.key.substring(0, 7) === 'thread-' ? item.key.substring(7).replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase()) :
              (item.key).replace(/([A-Z])/g, ' $1').trim().toLowerCase()} `}
          </span>
          to
          <span className="feed__activity__info__value--space">
            {` ${!Array.isArray(item.value) && item.value}`}
          </span>
        </p>
      </div>
      <FeedTileContext item={item} />
    </div>

    {(Array.isArray(item.value)
      && item.value
      && item.value.length > 0
      && item.value[0].contentUrl)
      ? (
        <img
          src={`https://ipfs.infura.io/ipfs/${item.value[0].contentUrl['/']}`}
          className="feed__activity__image clearProfPic"
          alt="profile"
        />
      ) : ''
    }
  </div>
);

FeedTileSpace.propTypes = {
  item: PropTypes.object,
};

FeedTileSpace.defaultProps = {
  item: {},
};