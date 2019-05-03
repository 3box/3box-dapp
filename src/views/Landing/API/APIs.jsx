import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { scroller, scrollSpy } from 'react-scroll';

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
      // width: window.innerWidth,
    };
  }

  // componentWillMount() {
  //   window.addEventListener('resize', this.handleWindowSizeChange);
  // }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { pathname } = this.props.history.location;
    const section = pathname.split('/')[2];
    // const { width } = this.state;
    // const offset = width <= 812 ? -68 : -120;
    const offset = -68;
    scroller.scrollTo(section, {
      duration: 1000,
      delay: 300,
      offset,
      smooth: 'easeInOutQuint',
    });
  }

  componentWillReceiveProps(nextProps) {
    const { openSection } = this.state;
    const nextSection = nextProps.history.location.pathname.split('/')[2];

    if (openSection !== nextSection) {
      this.setState({ openSection: nextSection }, this.scrollTo(nextSection));
    }
  }

  scrollTo = (section) => {
    // scrollSpy.update();
    // scroller.scrollTo(section, {
    //   duration: 1000,
    //   delay: 300,
    //   offset: -68,
    //   smooth: 'easeInOutQuint',
    // });
  }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.handleWindowSizeChange);
  // }

  // handleWindowSizeChange = () => {
  //   this.setState({ width: window.innerWidth });
  // }

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
      setTimeout(this.props.history.push(`/products/${section}`), 350);
    }
  }

  render() {
    const { openSection } = this.state;
    const offset = -68;

    return (
      <div className="landing_page">
        <APIMain />

        <ProfileSection
          handleOpenSection={this.handleOpenSection}
          openSection={openSection === 'profiles'}
          offset={offset}
        />
        <ProfileDetails openSection={openSection === 'profiles'} />

        <MessagingSection
          handleOpenSection={this.handleOpenSection}
          openSection={openSection === 'messaging'}
          offset={offset}
        />
        <MessagingDetails openSection={openSection === 'messaging'} />

        <StorageSection
          handleOpenSection={this.handleOpenSection}
          openSection={openSection === 'storage'}
          offset={offset}
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
};

APIsPage.defaultProps = {
  isLoggedIn: false,
};

const mapState = state => ({
  isLoggedIn: state.userState.isLoggedIn,
});

export default withRouter(connect(mapState)(APIsPage));
