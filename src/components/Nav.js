import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import ThreeBoxLogo from '../assets/ThreeBoxLogoBlue.svg';
import { handleSignOut } from '../state/actions';
import * as routes from '../utils/routes';
import Profile from '../assets/Profile.svg';
import Edit from '../assets/Edit.svg';
import SignOut from '../assets/SignOut.svg';
import Report from '../assets/Report.svg';
import './styles/Nav.css';

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
    const { threeBox } = this.props;
    if (threeBox.logout) {
      this.props.handleSignOut();
    }
  }

  render() {
    const { showProfileModal } = this.state;
    const { image, location } = this.props;
    const { pathname } = location;
    const networkColor = this.props.currentNetwork;

    return (
      <nav>
        <div id="nav__logo--marginLeft">
          <Link to={routes.LANDING}>
            <img src={ThreeBoxLogo} alt="3Box Logo" className="landing__nav__logo" />
          </Link>
        </div>

        <div id="nav__networkStatus">
          <div id="nav__networkStatus__networkColor" className={`${networkColor}`} />
          <p>{networkColor}</p>
        </div>

        {
          image.length > 0 && image[0].contentUrl ?
            <img src={`https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} className="nav__userPicture clearProfPic" alt="profile" onClick={this.handleDropdown} role="button" />
            : <div className="nav__userPicture" onClick={this.handleDropdown} />
        }

        {/* desktop nav dropdown */}
        <div className={`${showProfileModal ? 'nav__dropdown--visible' : undefined} nav__dropdown nav__dropdown--desktop`}
          onClick={this.handleDropdown}>
          <ul>
            <Link to={routes.PROFILE}>
              <li className="nav__dropdown__wrapper">
                <img src={Profile} className="nav__dropdown__icon" alt="profile" role="button" />
                Profile
              </li>
            </Link>
            <Link to={routes.EDITPROFILE}>
              <li className="nav__dropdown__wrapper">
              <img src={Edit} className="nav__dropdown__icon" alt="profile" role="button" />
                Edit profile
              </li>
            </Link>
            <div className="nav__divide" />
            <li onClick={() => this.handleSignOut()} className="nav__dropdown__wrapper">
            <img src={SignOut} className="nav__dropdown__icon" alt="profile" role="button" />
              Sign Out
            </li>
          </ul>
        </div>

        {showProfileModal &&
          <div className='onClickOutside' onClick={this.handleDropdown} />}

        {/* mobile nav dropdown */}
        <div className={`${showProfileModal ? 'sideDrawer' : undefined} nav__dropdown mobileDropDown`} onMouseLeave={this.handleDropdown} onClick={this.handleDropdown}>
          <ul>
            <div className='nav__dropdown__mobileLogo'>
            <img src={ThreeBoxLogo} alt="3Box Logo" className="landing__nav__logo" />
              
            </div>
            <Link to={routes.PROFILE}><li className={pathname === routes.PROFILE ? 'nav__activePage' : ''}>Profile</li></Link>
            <Link to={routes.EDITPROFILE}><li className={pathname === routes.EDITPROFILE ? 'nav__activePage' : ''}>Edit profile</li></Link>
            <li id="mobileNav__signout" onClick={() => this.handleSignOut()}>Sign Out</li>
          </ul>
        </div>
        
        <div id={showProfileModal ? 'dropdownContainer' : undefined} onClick={this.handleDropdown} />

      </nav>
    );
  }
}

Nav.propTypes = {
  image: PropTypes.array,
  threeBox: PropTypes.object,
  location: PropTypes.object,
  handleSignOut: PropTypes.func,
  currentNetwork: PropTypes.string,
};

Nav.defaultProps = {
  image: [],
  threeBox: {},
  handleSignOut: handleSignOut(),
  currentNetwork: '',
  location: {},
};

function mapState(state) {
  return {
    image: state.threeBox.image,
    threeBox: state.threeBox.box,
    currentNetwork: state.threeBox.currentNetwork,
  };
}

export default withRouter(connect(mapState, { handleSignOut })(Nav));