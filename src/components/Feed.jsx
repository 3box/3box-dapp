import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FeedTileAddressTXS from './FeedTileAddressTXS.jsx';
import FeedTileAddressToken from './FeedTileAddressToken.jsx';
import FeedTileAddressInternal from './FeedTileAddressInternal.jsx';
import { getActivity } from '../state/actions';
import Loading from '../assets/Loading.svg';
import './styles/Feed.css';
// import Clipboard from '../assets/Clipboard.svg';

const Feed = ({ ifFetchingActivity, feedByAddress }) => (
  <div id="feed">
    <p className="header" id="page_header">Activity</p>
    <div id="feed_activity_address">
      {ifFetchingActivity
        && (
          <div id="feed_activity_load">
            <img src={Loading} alt="loading" id="activityLoad" />
          </div>
        )
      }
      {feedByAddress &&
        feedByAddress.map((feedAddress, i) => (
          <div key={i} className="feed_activity_address_tile">
            <div className="feed_activity_context">
              <div className="feed_activity_network_icon" />
              <h5>
                {Object.keys(feedAddress)[0]}
              </h5>
              {/* <div className="clipboard" onClick={() => this.copyToClipboard(Object.keys(feedAddress)[0]) }>
                      <img src={Clipboard} alt="Clipboard Icon" />
                  </div> */}
            </div>
            {
              Object.values(feedAddress)[0].map((item, i) => (
                item.dataType === 'Internal'
                  ? <FeedTileAddressInternal item={item} key={i} isEven={parseInt(i) % 2 === 0} />
                  : item.dataType === 'Token'
                    ? <FeedTileAddressToken item={item} key={i} isEven={parseInt(i) % 2 === 0} />
                    : <FeedTileAddressTXS item={item} key={i} isEven={parseInt(i) % 2 === 0} />
              ))
            }
          </div>
        ))
      }
    </div>
  </div>
)

Feed.propTypes = {
  feed: PropTypes.array,
  feedByAddress: PropTypes.array,
  ifFetchingActivity: PropTypes.bool,
};

Feed.defaultProps = {
  feed: [],
  feedByAddress: [],
  ifFetchingActivity: false,
};

const mapState = state => ({
  feed: state.threeBoxData.feed,
  feedByAddress: state.threeBoxData.feedByAddress,
  ifFetchingActivity: state.threeBoxData.ifFetchingActivity,
});

export default connect(mapState, { getActivity })(Feed);



  // copyToClipboard = (copiedAddress) => {
  //   var dummy = document.createElement("input");
  //   document.body.appendChild(dummy);
  //   dummy.setAttribute('value', copiedAddress);
  //   dummy.select();

  //   document.execCommand('copy');
  // };

// {showTime ?
//   <div id="feed_activity">
//     <div>
//       <ul id="feed_activity_header">
//         <li id="feed_activity_network">Network</li>
//         <li id="feed_activity_type">Type</li>
//         <li id="feed_activity_function">Function</li>
//         <li id="feed_activity_entity">Entity</li>
//         <li id="feed_activity_description">Description</li>
//         <li id="feed_activity_amount">Amount</li>
//         <li id="feed_activity_time">Time</li>
//       </ul>
//     </div>

//     {ifFetchingActivity
//       && (
//         <div id="feed_activity_load">
//           <img src={Loading} alt="loading" id="activityLoad" />
//         </div>
//       )
//     }

//     {renderFeed.length > 0
//       ? renderFeed.map((feedItem, i) => (
//         feedItem.dataType === 'Internal'
//           ? <FeedTileInternal feedItem={feedItem} key={i} />
//           : feedItem.dataType === 'Token'
//             ? <FeedTileToken feedItem={feedItem} key={i} />
//             : <FeedTileTXS feedItem={feedItem} key={i} />
//       ))
//       : null
//     }

//   </div>
//   :
//   <div id="feed_activity_address">
//     {feedByAddress &&
//       feedByAddress.map((feedAddress, i) => (
//         <div key={i} className="feed_activity_address_tile">
//           <div className="feed_activity_context">
//             <div className="feed_activity_network_icon" />
//             <textarea ref={(textarea) => this.entityAddress = textarea} value={Object.keys(feedAddress)[0]}>
//               {Object.keys(feedAddress)[0]}
//             </textarea>
//             <div className="clipboard" onClick={this.copyToClipboard}>
//               <img src={Clipboard} alt="Clipboard Icon" />
//             </div>
//             {this.state.copySuccess}
//           </div>
//           {Object.values(feedAddress)[0].map((item, i) => (
//             item.dataType === 'Internal'
//               ? <FeedTileAddressInternal item={item} key={i} isEven={parseInt(i) % 2 === 0} />
//               : item.dataType === 'Token'
//                 ? <FeedTileAddressToken item={item} key={i} isEven={parseInt(i) % 2 === 0} />
//                 : <FeedTileAddressTXS item={item} key={i} isEven={parseInt(i) % 2 === 0} />
//           ))}
//         </div>
//       ))
//     }