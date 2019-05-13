import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActivityHeader from './ActivityHeader';
import ActivityTiles from './ActivityTiles';
import StatusUpdate from '../StatusUpdate';
import Loading from '../../../assets/Loading.svg';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';

const Activity = ({
  isFetchingActivity,
  feedByAddress,
  otherProfileActivity,
}) => (
    <div className="contacts">
    </div>
  );

Activity.propTypes = {
  feedByAddress: PropTypes.array,
  isFetchingActivity: PropTypes.bool,
  currentAddress: PropTypes.string,
  name: PropTypes.string,
  otherProfileAddress: PropTypes.string,
  otherProfileActivity: PropTypes.array,
  location: PropTypes.object,
  otherName: PropTypes.string,
};

Activity.defaultProps = {
  feedByAddress: [],
  name: '',
  isFetchingActivity: false,
  otherProfileAddress: '',
  currentAddress: '',
  otherName: '',
  otherProfileActivity: [],
  location: {},
};

const mapState = state => ({
  feedByAddress: state.myData.feedByAddress,
  isFetchingActivity: state.uiState.isFetchingActivity,
  otherProfileActivity: state.otherProfile.otherProfileActivity,
  currentAddress: state.userState.currentAddress,

  otherProfileAddress: state.otherProfile.otherProfileAddress,
  name: state.myData.name,
  otherName: state.otherProfile.otherName,
});

export default connect(mapState)(Activity);
