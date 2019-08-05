import React, { Component } from 'react';
import Box from '3box';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles/Profile.css';
import PubProfileHeaders from './PublicProfile/PubProfileHeaders';

class ProfilePublic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherImage: [],
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
    const otherImage = publicProfile.image;
    const otherName = publicProfile.name;
    this.setState({
      otherImage,
      otherName,
    });
  };

  render() {
    const {
      otherImage,
      otherName,
      otherProfileAddress,
    } = this.state;

    return (
      <PubProfileHeaders
        otherName={otherName}
        otherProfileAddress={otherProfileAddress}
        otherImage={otherImage}
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
