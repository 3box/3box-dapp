import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

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
    this.state = {
      openSection: ''
    };
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
    }
  }

  render() {
    const { openSection } = this.state;

    return (
      <div className="landing_page">
        <APIMain />

        <ProfileSection
          handleOpenSection={this.handleOpenSection}
          openSection={openSection === 'profile'}
        />
        <ProfileDetails openSection={openSection === 'profile'} />

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
