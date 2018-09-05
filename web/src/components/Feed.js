import React from 'react';
// import PropTypes from 'prop-types';
import FeedTile from './FeedTile';
import FeedTile3 from './FeedTile3Box';
import './styles/Feed.css';

const Feed = () => (
  <div id="feed">
    <p className="header" id="page_header">Activity</p>
    <div id="feed_activity">
      <ul id="feed_activity_header">
        <li>Network</li>
        <li>Entity</li>
        <li>Function</li>
        <li>Description</li>
        <li>Amount</li>
      </ul>
      <FeedTile />
      <FeedTile3 />
      <FeedTile />
      <FeedTile3 />
      <FeedTile />
      <FeedTile3 />
      <FeedTile />
      <FeedTile />
      <FeedTile3 />
      <FeedTile />
      <FeedTile />
      <FeedTile3 />
    </div>
  </div>
);

Feed.propTypes = {
};

export default Feed;
