import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../state/actions';
import { store } from '../../state/store';
import './styles/Profile.css';
import PubProfileHeaders from './PublicProfile/PubProfileHeaders';

const {
  getOtherProfileHeaders,
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
      // store.dispatch({
      //   type: 'OTHER_ADDRESS_UPDATE',
      //   otherProfileAddress,
      // });
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
    console.log('thispubprfoile', publicProfile);
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
    // const {
    // otherImage,
    // otherName,
    //   otherProfileAddress,
    // } = this.props;
    const {
      otherImage,
      otherName,
      otherProfileAddress,
    } = this.state;

    return (
      <React.Fragment>
        <PubProfileHeaders
          otherName={otherName}
          otherProfileAddress={otherProfileAddress}
          otherImage={otherImage}
        />
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
};

ProfilePublic.defaultProps = {
  pathname: {},
  location: {},
  currentAddress: '',
  otherName: '',
  otherProfileAddress: '',
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