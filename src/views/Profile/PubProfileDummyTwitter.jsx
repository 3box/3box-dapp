import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../state/actions';
import { store } from '../../state/store';
import './styles/Profile.css';
import TwitterHeader from './PublicProfile/TwitterHeader';

const {
  getOtherProfileHeaders,
} = actions.profile;

class ProfilePublic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    try {
      const { location: { pathname } } = this.props;
      const otherProfileAddress = pathname.split('/')[1];
      store.dispatch({
        type: 'OTHER_ADDRESS_UPDATE',
        otherProfileAddress,
      });
      this.props.getOtherProfileHeaders(otherProfileAddress);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      otherImage,
      otherName,
      otherProfileAddress,
    } = this.props;

    return (
      <React.Fragment>
        <TwitterHeader
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