import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import actions from '../../state/actions';
import './styles/Profile.css';
import PubProfileHeaders from './PublicProfile/PubProfileHeaders';

const {
  getPublicProfile,
} = actions.profile;

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
    const graphqlQueryObject = `
    {
      profile(id: "${profileAddress}") {
        name
        image
      }
    }
    `;
    const publicProfile = await getPublicProfile(graphqlQueryObject);
    this.setState({
      otherImage: [{
        '@type': 'ImageObject',
        contentUrl: {
          '/': publicProfile.profile.image,
        },
      }],
      otherName: publicProfile.profile.name,
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
