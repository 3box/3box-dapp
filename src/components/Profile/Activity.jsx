import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  FeedTileTXS,
  FeedTileToken,
  FeedTileInternal,
  FeedTileActivity,
} from './FeedTile';

import networkArray from '../../utils/networkArray';
import Loading from '../../assets/Loading.svg';
import '../styles/Feed.css';
import '../../views/styles/Profile.css';
import '../styles/NetworkArray.css';

const Activity = ({
  ifFetchingActivity,
  feedByAddress,
  verifiedGithub,
  verifiedTwitter,
  publicProfileActivity,
  onPublicProfilePage,
  currentAddress,
  publicProfileAddress,
  name,
  image,
  publicName,
}) => (
    <div id="feed">
      <div>
        <p className="header" id="feed__header">Activity</p>
        <div className="feed__activity__address">
          {(ifFetchingActivity && !onPublicProfilePage)
            && (
              <div className="feed__activity__load">
                <img src={Loading} alt="loading" id="activityLoad" />
              </div>
            )}
          {(!onPublicProfilePage && feedByAddress.length > 0)
            ? feedByAddress.map((feedAddress, i) => (
              <div key={i} className="feed__activity__tile">
                <div className="feed__activity__context">
                  {Object.keys(feedAddress)[0] === 'threeBox' ?
                    image.length > 0 && image[0].contentUrl
                      ? <img src={`https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} className="feed__activity__user" alt="profile" />
                      : <div className="feed__activity__user" />
                    : (
                      <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
                        0x
                      </div>)
                  }
                  <div className="feed__activity__address">
                    {Object.keys(feedAddress)[0] === 'threeBox'
                      ? (
                        <div>
                          <h4>
                            {name}
                          </h4>
                          <p>
                            3Box Profile
                          </p>
                        </div>
                      )
                      : (
                        <div>
                          <a href={`https://3box.io/${Object.keys(feedAddress)[0]}`} >
                            <h4>
                              {(feedAddress.metaData && feedAddress.metaData.name) ? feedAddress.metaData.name : Object.keys(feedAddress)[0]}
                            </h4>
                          </a>
                          <p>
                            Ethereum Address
                          </p>
                        </div>
                      )}
                  </div>
                </div>
                {
                  Object.values(feedAddress)[0].map((item, index) => (
                    (() => {
                      if (item.dataType === 'Internal') return <FeedTileInternal item={item} key={index} metaDataName={feedAddress.metaData && feedAddress.metaData.name} currentAddress={currentAddress} name={name} isEven={parseInt(index, 10) % 2 === 0} />;
                      if (item.dataType === 'Token') return <FeedTileToken item={item} key={index} metaDataName={feedAddress.metaData && feedAddress.metaData.name} currentAddress={currentAddress} name={name} isEven={parseInt(index, 10) % 2 === 0} />;
                      if (item.dataType === 'Txs') return <FeedTileTXS item={item} key={index} metaDataName={feedAddress.metaData && feedAddress.metaData.name} currentAddress={currentAddress} name={name} isEven={parseInt(index, 10) % 2 === 0} />;
                      if (item.dataType === 'Public') return <FeedTileActivity item={item} key={index} verifiedGithub={verifiedGithub} verifiedTwitter={verifiedTwitter} isEven={parseInt(index, 10) % 2 === 0} />;
                      if (item.dataType === 'Private') return <FeedTileActivity item={item} key={index} isEven={parseInt(index, 10) % 2 === 0} />;
                    })()
                  ))
                }
              </div>
            ))
            : (!ifFetchingActivity && !publicProfileActivity.length)
            && (
              <div className="feed__activity__load">
                <p>No activity at this address yet</p>
              </div>
            )
          }

          {(onPublicProfilePage && publicProfileActivity.length > 0)
            ? publicProfileActivity.map((feedAddress, i) => (
              <div key={i} className="feed__activity__tile">
                <div className="feed__activity__context">
                  {Object.keys(feedAddress)[0] === 'threeBox' ? (
                    <div className="logo__icon feed__activity__context__network">
                      <h2>3</h2>
                    </div>
                  )
                    : ''}
                  {(feedAddress.metaData && feedAddress.metaData.image) ?
                    <img src={`https://ipfs.infura.io/ipfs/${feedAddress.metaData.image}`} className="feed__activity__user" alt="profile" />
                    : (
                      <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
                        0x
                      </div>)
                  }
                  <div className="feed__activity__address">
                    {Object.keys(feedAddress)[0] === 'threeBox'
                      ? (
                        <div>
                          <h4>
                            3Box
                          </h4>
                          <p>
                            Activity
                          </p>
                        </div>
                      )
                      : (
                        <div>
                          <a href={`https://3box.io/${Object.keys(feedAddress)[0]}`} >
                            <h4>
                              {(feedAddress.metaData && feedAddress.metaData.name) ? feedAddress.metaData.name : Object.keys(feedAddress)[0]}
                            </h4>
                          </a>
                          <p>
                            Ethereum Address
                      </p>
                        </div>
                      )}
                  </div>
                </div>
                {
                  Object.values(feedAddress)[0].map((item, index) => (
                    (() => {
                      if (item.dataType === 'Internal') return <FeedTileInternal currentAddress={publicProfileAddress} metaDataName={feedAddress.metaData && feedAddress.metaData.name} onPublicProfilePage name={publicName} item={item} key={index} />;
                      if (item.dataType === 'Token') return <FeedTileToken currentAddress={publicProfileAddress} metaDataName={feedAddress.metaData && feedAddress.metaData.name} onPublicProfilePage name={publicName} item={item} key={index} />;
                      if (item.dataType === 'Txs') return <FeedTileTXS currentAddress={publicProfileAddress} metaDataName={feedAddress.metaData && feedAddress.metaData.name} onPublicProfilePage name={publicName} item={item} key={index} />;
                    })()
                  ))
                }
              </div>
            ))
            : (!ifFetchingActivity && publicProfileActivity.length > 0)
            && (
              <div className="feed__activity__load">
                <p>No activity at this address yet</p>
              </div>
            )
          }

        </div>
      </div>
      <div className="feed__footer">
        <div className="logo__icon--footer">
          <h2>3</h2>
        </div>
      </div>
    </div>
  );

Activity.propTypes = {
  feedByAddress: PropTypes.array,
  ifFetchingActivity: PropTypes.bool,
  onPublicProfilePage: PropTypes.bool,
  verifiedGithub: PropTypes.string,
  verifiedTwitter: PropTypes.string,
  currentAddress: PropTypes.string,
  name: PropTypes.string,
  publicProfileAddress: PropTypes.string,
  image: PropTypes.array,
  publicProfileActivity: PropTypes.array,
  location: PropTypes.object,
  publicName: PropTypes.string,
};

Activity.defaultProps = {
  feedByAddress: [],
  image: [],
  name: '',
  ifFetchingActivity: false,
  onPublicProfilePage: false,
  verifiedGithub: '',
  verifiedTwitter: '',
  publicProfileAddress: '',
  currentAddress: '',
  publicName: '',
  publicProfileActivity: [],
  location: {},
};

const mapState = state => ({
  feedByAddress: state.threeBox.feedByAddress,
  ifFetchingActivity: state.threeBox.ifFetchingActivity,
  verifiedGithub: state.threeBox.verifiedGithub,
  verifiedTwitter: state.threeBox.verifiedTwitter,
  publicProfileActivity: state.threeBox.publicProfileActivity,
  onPublicProfilePage: state.threeBox.onPublicProfilePage,
  currentAddress: state.threeBox.currentAddress,
  publicProfileAddress: state.threeBox.publicProfileAddress,
  name: state.threeBox.name,
  image: state.threeBox.image,
  publicName: state.threeBox.publicName,
});

export default connect(mapState)(Activity);
