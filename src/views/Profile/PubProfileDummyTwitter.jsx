import React, { Component } from 'react';
import Box from '3box';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles/Profile.scss';
import TwitterHeader from './PublicProfile/TwitterHeader';

class ProfilePublic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherName: '',
      otherProfileAddress: '',
    };
  }

  componentDidMount() {
    try {
      const { location: { pathname } } = this.props;
      const otherProfileAddress = pathname.split('/')[1];
      this.setState({ otherProfileAddress });
      this.getOtherProfileHeaders(otherProfileAddress);
    } catch (err) {
      console.error(err);
    }
  }

  getOtherProfileHeaders = async (profileAddress) => {
    const publicProfile = await Box.getProfile(profileAddress);
    const otherName = publicProfile.name;
    this.setState({
      otherName,
    });
  };

  render() {
    const {
      otherName,
      otherProfileAddress,
    } = this.state;

    return (
      <TwitterHeader
        otherName={otherName}
        otherProfileAddress={otherProfileAddress}
      />
    );
  }
}

ProfilePublic.propTypes = {
  location: PropTypes.object,
  pathname: PropTypes.string,
};

ProfilePublic.defaultProps = {
  location: {},
  pathname: '',
};

export default withRouter(ProfilePublic);