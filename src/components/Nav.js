import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';

import ThreeBoxLogo from './ThreeBoxLogo.jsx';
import * as routes from '../utils/routes';
import history from '../history';
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
    threeBox.logout();
    history.push(routes.LANDING);
  }

  render() {
    const { showProfileModal, goHome } = this.state;
    const { image, threeBox, location } = this.props;
    const { pathname } = location;

    return (
      <div>
        {pathname !== '/' &&
          <nav>
            <ThreeBoxLogo />
            {
              image.length > 0 && image[0].contentUrl ?
                <img src={`https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} id="nav__userPicture" alt="profile" onClick={this.handleDropdown} role="button" />
                : <div id="nav__userPicture" onClick={this.handleDropdown} />
            }

            {showProfileModal
              && (
                <div className='nav__dropdown' onMouseLeave={this.handleDropdown} onClick={this.handleDropdown}>
                  <ul>
                    <Link to={routes.PROFILE}><li>Profile</li></Link>
                    <Link to={routes.EDITPROFILE}><li>Edit profile</li></Link>
                    <div className="nav__divide" />
                    <li onClick={() => threeBox && this.handleSignOut()}>Sign Out</li>
                    {/* <Link to={routes.LANDING} onClick={() => threeBox.logout()}><li>Sign Out</li></Link> */}
                    <div id="nav__divideBug" />
                    <a href="https://airtable.com/shrX4fI8MDuaPpef9"><li id="nav__reportBug">Report a bug</li></a>
                  </ul>
                </div>
              )
            }

            <div className={`${showProfileModal ? 'sideDrawer' : undefined} nav__dropdown mobileDropDown`} onMouseLeave={this.handleDropdown} onClick={this.handleDropdown}>
              <ul>
                <div className='nav__dropdown__mobileLogo'>
                  <ThreeBoxLogo />
                </div>
                <Link to={routes.PROFILE}><li className={pathname === '/Profile' ? 'nav__activePage' : ''}>Profile</li></Link>
                <Link to={routes.EDITPROFILE}><li className={pathname === '/EditProfile' ? 'nav__activePage' : ''}>Edit profile</li></Link>
                <Link to={routes.LANDING} ><li id="mobileNav__signout" onClick={() => threeBox && threeBox.logout()}>Sign Out</li></Link>
                <a href="https://airtable.com/shrX4fI8MDuaPpef9"><li id="nav__reportBug">Report a bug</li></a>
              </ul>
            </div>
            <div id={showProfileModal ? 'dropdownContainer' : undefined} onClick={this.handleDropdown} />

          </nav>
        }
      </div>
    );
  }
}

Nav.propTypes = {
  image: PropTypes.array,
  threeBox: PropTypes.object,
};

Nav.defaultProps = {
  image: [],
  threeBox: {},
};

function mapState(state) {
  return {
    image: state.threeBox.image,
    threeBox: state.threeBox.box,
  };
}

export default withRouter(connect(mapState)(Nav));

