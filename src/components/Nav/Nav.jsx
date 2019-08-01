import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter, NavLink } from 'react-router-dom';

import ProfilePicture from '../ProfilePicture';
import DesktopDropdown from './DesktopDropdown';
import ThreeBoxLogo from '../../assets/ThreeBoxLogoBlack.svg';
import ThreeBoxB from '../../assets/3Box3Blue.svg';
import DropDownMenu from '../../assets/DropDownMenu.svg';
import actions from '../../state/actions';
import * as routes from '../../utils/routes';
import { normalizeURL } from '../../utils/funcs';
import Folder from '../../assets/Folder.svg';
import '../styles/Nav.css';
import MobileDropdown from './MobileDropdown';

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
        <div id="nav__logo--marginLeft">
          <Link to={`/${currentAddress}/${routes.ACTIVITY}`}>
            <img src={ThreeBoxLogo} alt="3Box Logo" className="landing__nav__logo" />
          </Link>
        </div>

        <div id="nav__logo--mobile">
          <Link to={`/${currentAddress}/${routes.ACTIVITY}`}>
            <img src={ThreeBoxB} alt="3Box Logo" className="landing__nav__logo" />
          </Link>
        </div>

        <div className="nav__profile--mobile">
          <ProfilePicture
            pictureClass="nav__userPicture clearProfPic"
            onClickFunction={this.handleDropdown}
            isMyPicture
          />
        </div>

        <div id="nav__networkStatus">
          <div id="nav__networkStatus__networkColor" className={`${networkColor}`} />
          <p>{networkColor}</p>
        </div>

        <div
          className="nav__arrow"
          onClick={this.handleDropdown}
          onKeyPress={this.handleDropdown}

          role="button"
          tabIndex={0}
        >
          <img src={DropDownMenu} alt="dropdown" className="nav__arrow__icon" />
        </div>

        <span className="nav__tabs">
          <NavLink
            to={`/${currentAddress}/${routes.ACTIVITY}`}
            className="nav__profile"
            activeClassName="activeNav"
          >
            <ProfilePicture
              pictureClass="nav__userPicture clearProfPic"
              isMyPicture
            />
            Profile
          </NavLink>

          <NavLink
            to={`/${currentAddress}/${routes.DATA}`}
            className="nav__data"
            activeClassName="activeNav"
          >
            <img src={Folder} alt="Folder" className="nav__folder" />
            Data
          </NavLink>
        </span>

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