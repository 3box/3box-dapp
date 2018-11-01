import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';

import ThreeBoxLogo from './ThreeBoxLogo.jsx';
import { handleSignOut } from '../state/actions';
import * as routes from '../utils/routes';
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
          <ThreeBoxLogo />
        </div>

        <div id="nav__networkStatus">
          <div id="nav__networkStatus__networkColor" className={`${networkColor}`} />
          <p>{networkColor}</p>
        </div>

        {
          image.length > 0 && image[0].contentUrl ?
            <img src={`https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} id="nav__userPicture" alt="profile" onClick={this.handleDropdown} role="button" />
            : <div id="nav__userPicture" onClick={this.handleDropdown} />
        }

        {/* desktop nav dropdown */}
        <div className={`${showProfileModal ? 'nav__dropdown--visible' : undefined} nav__dropdown nav__dropdown--desktop`}
          onClick={this.handleDropdown}>
          <ul>
            <Link to={routes.PROFILE}><li>Profile</li></Link>
            <Link to={routes.EDITPROFILE}><li>Edit profile</li></Link>
            <div className="nav__divide" />
            <li onClick={() => this.handleSignOut()}>Sign Out</li>
            <div id="nav__divideBug" />
            <a href="https://airtable.com/shrX4fI8MDuaPpef9"><li id="nav__reportBug">Report a bug</li></a>
          </ul>
        </div>

        {showProfileModal ?
          <div className='onClickOutside' onClick={this.handleDropdown} />
          : null}

        {/* mobile nav dropdown */}
        <div className={`${showProfileModal ? 'sideDrawer' : undefined} nav__dropdown mobileDropDown`} onMouseLeave={this.handleDropdown} onClick={this.handleDropdown}>
          <ul>
            <div className='nav__dropdown__mobileLogo'>
              <ThreeBoxLogo />
            </div>
            <Link to={routes.PROFILE}><li className={pathname === '/Profile' ? 'nav__activePage' : ''}>Profile</li></Link>
            <Link to={routes.EDITPROFILE}><li className={pathname === '/EditProfile' ? 'nav__activePage' : ''}>Edit profile</li></Link>
            <li id="mobileNav__signout" onClick={() => this.handleSignOut()}>Sign Out</li>
            <a href="https://airtable.com/shrX4fI8MDuaPpef9"><li id="nav__reportBug">Report a bug</li></a>
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
  handleSignOut: PropTypes.func,
  currentNetwork: PropTypes.string,
};

Nav.defaultProps = {
  image: [],
  threeBox: {},
  handleSignOut: handleSignOut(),
  currentNetwork: '',
};

function mapState(state) {
  return {
    image: state.threeBox.image,
    threeBox: state.threeBox.box,
    currentNetwork: state.threeBox.currentNetwork,
  };
}

export default withRouter(connect(mapState, { handleSignOut })(Nav));