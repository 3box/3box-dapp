import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { alphabetize } from '../../utils/funcs';
import Globe from '../../assets/Globe.svg';
import ContactTile from '../../components/ContactTile';
import EmptyContact from '../../components/EmptyContact';
import './styles/Profile.css';
import './styles/Feed.css';

const Following = ({ following }) => (
  <div id="myFeed" className="contacts_page">
    <div className="header followingHeader">
      <div className="followingHeader_count">
        <p>
          {`Following (${following.length})`}
        </p>
        <img src={Globe} alt="Public" className="favorites__publicIcon" title="Following will appear in your public profile" />
      </div>
      <p className="followingHeader_warning">Addresses you follow are public</p>
    </div>

    <div className="contact_list">
      {
        following.length > 0 ? alphabetize(following).map(user => (
          <ContactTile
            user={user[0]}
            isFollowing
            address={user[1]}
          />
        )) : <EmptyContact />}
    </div>
  </div>
);

Following.propTypes = {
  following: PropTypes.array,
};

Following.defaultProps = {
  following: [],
};

function mapState(state) {
  return {
    following: state.myData.following,
  };
}

export default withRouter(connect(mapState)(Following));
