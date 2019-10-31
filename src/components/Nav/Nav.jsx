import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DesktopDropdown from './DesktopDropdown';
import NavSearch from './NavSearch';
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
      showMobileSearch: false,
      showResults: false,
    };
  }

  handleDropdown = () => {
    const { showProfileModal } = this.state;
    this.setState({
      showProfileModal: !showProfileModal,
    });
  }

  handleSignOut = () => {
    const { box, handleSignOut } = this.props;
    if (box.logout) handleSignOut();
  }

  handleMobileSearch = () => {
    const { showMobileSearch } = this.state;
    this.setState({ showMobileSearch: !showMobileSearch, showResults: !showMobileSearch });
  }

  handleToggleResults = (bool) => {
    const { showResults } = this.state;
    if (bool) {
      this.setState({ showResults: true });
    } else {
      this.setState({ showResults: !showResults });
    }
  }

  render() {
    const {
      showProfileModal,
      showMobileSearch,
      showResults,
    } = this.state;

    const {
      location,
      currentAddress,
      currentWalletLogo,
      handleSignInUp,
      currentNetwork,
    } = this.props;

    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);
    const networkColor = currentNetwork;

    return (
      <nav>
        <NavLinks
          handleDropdown={this.handleDropdown}
          currentAddress={currentAddress}
          networkColor={networkColor}
          showMobileSearch={showMobileSearch}
        />

        <DesktopDropdown
          handleDropdown={this.handleDropdown}
          handleSignOut={this.handleSignOut}
          showProfileModal={showProfileModal}
          currentAddress={currentAddress}
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

        <NavSearch
          handleMobileSearch={this.handleMobileSearch}
          handleToggleResults={this.handleToggleResults}
          showMobileSearch={showMobileSearch}
          showResults={showResults}
        />

        <MobileDropdown
          handleDropdown={this.handleDropdown}
          handleSignOut={this.handleSignOut}
          showProfileModal={showProfileModal}
          currentAddress={currentAddress}
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