import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { scroller, scrollSpy } from 'react-scroll';

import APIMain from './components/APIMain';
import { ProfileSection, MessagingSection, StorageSection } from './components/APISections';
import { ProfileDetails, MessagingDetails, StorageDetails } from './components/APIDetails';
import Footer from '../components/Footer';

import '../../styles/Landing.scss';
import '../../styles/NewLanding.scss';
import '../../../components/styles/Nav.scss';

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
    window.scrollTo(0, 0);
    const { pathname } = this.props.history.location;
    const section = pathname.split('/')[2];
    const offset = -68;
    scroller.scrollTo(section, {
      duration: 1000,
      delay: 300,
      offset,
      smooth: 'easeInOutQuint',
    });
    scrollSpy.update();
  }

  componentWillReceiveProps(nextProps) {
    const { openSection } = this.state;
    const nextSection = nextProps.history.location.pathname.split('/')[2];

    if (openSection !== nextSection) this.setState({ openSection: nextSection });
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

        <Footer />
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
