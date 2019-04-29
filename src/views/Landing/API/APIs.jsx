import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { scroller } from 'react-scroll';

import * as routes from '../../../utils/routes';
import APIMain from './components/APIMain';
import { ProfileSection, MessagingSection, StorageSection } from './components/APISections';
import { ProfileDetails, MessagingDetails, StorageDetails } from './components/APIDetails';

import '../../styles/Landing.css';
import '../../styles/NewLanding.css';
import '../../../components/styles/Nav.css';

const Footer = lazy(() => import('../components/Footer'));

class APIsPage extends React.Component {
  constructor(props) {
    super(props);
    const { pathname } = this.props.history.location;
    const section = pathname.split('/')[2];
    this.state = {
      openSection: section,
    };
  }

  componentDidMount() {
    const { pathname } = this.props.history.location;
    const section = pathname.split('/')[2];
    console.log('section', section);
    scroller.scrollTo(section, {
      duration: 1500,
      delay: 100,
      offset: -120,
      smooth: 'easeInOutQuint',
    });
  }

  handleOpenSection = (section) => {
    const { openSection } = this.state;
    if (openSection === section) {
      this.setState({
        openSection: '',
      });
    } else {
      this.setState({
        openSection: section,
      });
      this.props.history.push(`/products/${section}`);
    }
  }

  render() {
    const { openSection } = this.state;
    const { showInfoBanner } = this.props;

    return (
      <div className={`landing_page ${(showInfoBanner) ? 'bannerMargin' : ''}`}>
        <APIMain />

        <ProfileSection
          handleOpenSection={this.handleOpenSection}
          openSection={openSection === 'profiles'}
        />
        <ProfileDetails openSection={openSection === 'profiles'} />

        <MessagingSection
          handleOpenSection={this.handleOpenSection}
          openSection={openSection === 'messaging'}
        />
        <MessagingDetails openSection={openSection === 'messaging'} />

        <StorageSection
          handleOpenSection={this.handleOpenSection}
          openSection={openSection === 'storage'}
        />
        <StorageDetails openSection={openSection === 'storage'} />

        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>
      </div>
    );
  }
}

APIsPage.propTypes = {
  handleSignInUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  showInfoBanner: PropTypes.bool,
};

APIsPage.defaultProps = {
  isLoggedIn: false,
  showInfoBanner: false,
};

const mapState = state => ({
  isLoggedIn: state.userState.isLoggedIn,
  showInfoBanner: state.uiState.showInfoBanner,
});

export default withRouter(connect(mapState)(APIsPage));
