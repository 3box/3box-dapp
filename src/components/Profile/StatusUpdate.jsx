import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../../assets/Loading.svg';
import '../styles/Feed.css';

import actions from '../../state/actions';

const {
  getActivity,
  getProfileValue,
} = actions.profile;

class StatusUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      disableSave: true,
      saveLoading: false,
    };
  }

  componentDidMount() {
    const { status } = this.props;
    this.setState({ status });
  }

  componentWillReceiveProps(nextProps) {
    const { status } = nextProps;

    if (status !== this.props.status) this.setState({ status });
  }

  handleFormChange = (e, property) => {
    this.setState({ [property]: e.target.value, disableSave: false });
  }

  cancelChange = (e) => {
    e.preventDefault();
    const { status } = this.props;
    this.setState({ status, disableSave: true });
  }

  async handleSubmit(e, remove) {
    const {
      status,
    } = this.state;

    e.preventDefault();
    this.setState({ saveLoading: true });

    const statusChanged = status !== this.props.status;
    const { box } = this.props;

    // if value changed and is not empty, save new value, else remove value
    if (statusChanged && status !== '') await box.public.set('status', status);
    if ((statusChanged && status === '') || remove) await box.public.remove('status');

    if (statusChanged) await this.props.getProfileValue('public', 'status');
    this.props.getActivity();
    this.setState({ saveLoading: false, disableSave: true });
    if (remove) this.setState({ status: '' });
  }

  render() {
    const { status, disableSave, saveLoading } = this.state;
    const { showDownloadBanner, onPublicProfilePage, publicStatus, showSignInBanner } = this.props;

    return (
      <React.Fragment>
        {onPublicProfilePage && (
          <div
            className={`${showDownloadBanner ? 'statusUpdate--bannerMargin' : ''}
          statusUpdate
          ${!publicStatus ? 'hideUpdateOnMobile' : ''}
          `
            }
          >
            {/* <div
            className={`${showDownloadBanner ? 'statusUpdate--bannerMargin' : ''} ${showSignInBanner ? 'publicStatusUpdate--bannerMargin' : ''} 
          statusUpdate ${onPublicProfilePage ? 'publicStatusUpdate' : ''}
          ${!publicStatus ? 'hideUpdateOnMobile' : ''}
          `
            }
          > */}
            <div className="statusUpdate__displayPublic">
              {publicStatus}
            </div>
          </div>)}

        {!onPublicProfilePage && (
          <div className={`${(showDownloadBanner || showDownloadBanner) ? 'statusUpdate--bannerMargin' : ''} statusUpdate`}>
            {saveLoading
              && (
                <div className="statusUpdate__loading">
                  <img src={Loading} alt="loading" />
                </div>
              )}

            <input
              name="name"
              type="text"
              value={status}
              className="statusUpdate__field"
              placeholder="Set a status..."
              onChange={e => this.handleFormChange(e, 'status')}
            />

            {!disableSave
              && (
                <button
                  type="button"
                  className="statusUpdate__button statusUpdate__button--save"
                  onClick={e => this.handleSubmit(e)}
                >
                  Save
                </button>)}

            {!disableSave
              && (
                <button
                  type="button"
                  className="statusUpdate__button statusUpdate__button--cancel"
                  onClick={e => this.cancelChange(e)}
                >
                  Cancel
                </button>)}

            {(disableSave && status !== '')
              && (
                <button
                  type="button"
                  className="statusUpdate__button statusUpdate__button--remove hideStatusButton"
                  onClick={e => this.handleSubmit(e, 'remove')}
                >
                  Remove
                </button>)}
          </div>)}

      </React.Fragment>
    );
  }
}

StatusUpdate.propTypes = {
  status: PropTypes.string,
  publicStatus: PropTypes.string,
  showDownloadBanner: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  getActivity: PropTypes.func.isRequired,
  getProfileValue: PropTypes.func.isRequired,
  box: PropTypes.object,
  location: PropTypes.object.isRequired,
  onPublicProfilePage: PropTypes.bool,
};

StatusUpdate.defaultProps = {
  box: {},
  status: '',
  publicStatus: '',
  showDownloadBanner: false,
  showSignInBanner: false,
  onPublicProfilePage: false,
};

function mapState(state) {
  return {
    box: state.threeBox.box,
    status: state.threeBox.status,
    publicStatus: state.threeBox.publicStatus,
    showDownloadBanner: state.threeBox.showDownloadBanner,
    showSignInBanner: state.threeBox.showSignInBanner,
    onPublicProfilePage: state.threeBox.onPublicProfilePage,
  };
}

export default withRouter(connect(mapState,
  {
    getActivity,
    getProfileValue,
  })(StatusUpdate));
