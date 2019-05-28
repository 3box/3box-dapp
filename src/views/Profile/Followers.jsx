import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ContactTile from '../../components/ContactTile';
import './styles/Profile.css';
import './styles/Feed.css';

const Followers = ({ following }) => (
  <div id="myFeed" className="contacts_page">
    <p className="header publicHeader" id="feed__header">
      {`Followers (${following.length})`}
    </p>
    <div className="contact_list">
      {following.map(user => (
        <ContactTile user={user[0]} onMyProfile address={user[1]} />
      ))}
    </div>
  </div>
);

Followers.propTypes = {
  following: PropTypes.array,
};

Followers.defaultProps = {
  following: [],
};

function mapState(state) {
  return {
    following: state.myData.following,
  };
}

export default withRouter(connect(mapState)(Followers));
