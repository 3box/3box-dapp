import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../state/actions';
import { store } from '../../state/store';
import './styles/Profile.css';
import PubProfileHeaders from './PublicProfile/PubProfileHeaders';
import TwitterHeader from './PublicProfile/TwitterHeader';

const {
  getOtherProfileHeaders,
} = actions.profile;

class ProfilePublic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    try {
      const { location: { pathname } } = this.props;
      const otherProfileAddress = pathname.split('/')[1];
      store.dispatch({
        type: 'OTHER_ADDRESS_UPDATE',
        otherProfileAddress,
      });
      await this.props.getOtherProfileHeaders(otherProfileAddress);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      otherImage,
      otherName,
      otherProfileAddress,
      isTwitter,
    } = this.props;

    return (
      <React.Fragment>
        {isTwitter ? (
          <TwitterHeader
            otherName={otherName}
            otherProfileAddress={otherProfileAddress}
            otherImage={otherImage}
            isTwitter={isTwitter}
          />
        ) : (
          <PubProfileHeaders
            otherName={otherName}
            otherProfileAddress={otherProfileAddress}
            otherImage={otherImage}
          />
        )}
      </React.Fragment>
    );
  }
}

ProfilePublic.propTypes = {
  getOtherProfileHeaders: PropTypes.func.isRequired,
  pathname: PropTypes.object,
  location: PropTypes.object,
  currentAddress: PropTypes.string,
  otherImage: PropTypes.array,
  otherName: PropTypes.string,
  otherProfileAddress: PropTypes.string,
  isTwitter: PropTypes.bool,
};

ProfilePublic.defaultProps = {
  pathname: {},
  location: {},
  currentAddress: '',
  otherName: '',
  otherProfileAddress: '',
  isTwitter: false,
};

const mapState = state => ({
  currentAddress: state.userState.currentAddress,
  otherName: state.otherProfile.otherName,
  otherImage: state.otherProfile.otherImage,
  otherProfileAddress: state.otherProfile.otherProfileAddress,
});

export default withRouter(connect(mapState,
  {
    getOtherProfileHeaders,
  })(ProfilePublic));