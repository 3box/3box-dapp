import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import actions from '../../state/actions';
import './styles/Profile.css';
import TwitterHeader from './PublicProfile/TwitterHeader';

const {
  getPublicProfile,
} = actions.profile;

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
    const graphqlQueryObject = `
    {
      profile(id: "${profileAddress}") {
        name
      }
    }
    `;
    const publicProfile = await getPublicProfile(graphqlQueryObject);

    this.setState({
      otherName: publicProfile.profile.name,
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