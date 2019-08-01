import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DesktopDropdown from './DesktopDropdown';
import NavLinks from './NavLinks';
import actions from '../../state/actions';
import { normalizeURL } from '../../utils/funcs';
import MobileDropdown from './MobileDropdown';
import '../styles/Nav.css';

const { handleSignOut } = actions.signin;

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfileModal: false,
    };
  }

  handleDropdown = () => {
    const { showProfileModal } = this.state;
    this.setState({
      showProfileModal: !showProfileModal,
    });
  }

  handleSignOut = () => {
    const { box } = this.props;
    if (box.logout) this.props.handleSignOut();
  }

  render() {
    const { showProfileModal } = this.state;
    const {
      location,
      currentAddress,
      currentWalletLogo,
      handleSignInUp,
    } = this.props;
    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);
    const networkColor = this.props.currentNetwork;

    return (
      <nav>
        <NavLinks
          currentAddress={currentAddress}
          handleDropdown={this.handleDropdown}
          networkColor={networkColor}
        />

        <DesktopDropdown
          showProfileModal={showProfileModal}
          currentAddress={currentAddress}
          handleDropdown={this.handleDropdown}
          handleSignOut={this.handleSignOut}
          handleSignInUp={handleSignInUp}
          currentWalletLogo={currentWalletLogo}
          networkColor={networkColor}
        />

        {showProfileModal && (
          <div
            className="onClickOutside"
            onClick={this.handleDropdown}
            onKeyPress={this.handleDropdown}
            tabIndex={0}
            role="button"
          />
        )}

        <MobileDropdown
          showProfileModal={showProfileModal}
          currentAddress={currentAddress}
          handleDropdown={this.handleDropdown}
          handleSignOut={this.handleSignOut}
          handleSignInUp={handleSignInUp}
          currentWalletLogo={currentWalletLogo}
          networkColor={networkColor}
          normalizedPath={normalizedPath}
        />

        <div
          id={showProfileModal ? 'dropdownContainer' : undefined}
          onClick={this.handleDropdown}
          onKeyPress={this.handleDropdown}
          role="button"
          tabIndex={0}
        />
      </nav>
    );
  }
}

Nav.propTypes = {
  box: PropTypes.object,
  location: PropTypes.object,
  handleSignOut: PropTypes.func.isRequired,
  name: PropTypes.string,
  currentNetwork: PropTypes.string,
  currentAddress: PropTypes.string,
  currentWallet: PropTypes.string,
  currentWalletLogo: PropTypes.string,
  handleSignInUp: PropTypes.func.isRequired,
};

Nav.defaultProps = {
  box: {},
  currentNetwork: '',
  name: '',
  currentAddress: '',
  currentWallet: '',
  currentWalletLogo: '',
  location: {},
};

function mapState(state) {
  return {
    box: state.myData.box,
    name: state.myData.name,

    currentNetwork: state.userState.currentNetwork,
    currentAddress: state.userState.currentAddress,
    currentWallet: state.userState.currentWallet,
    currentWalletLogo: state.userState.currentWalletLogo,
  };
}

export default withRouter(connect(mapState, { handleSignOut })(Nav));