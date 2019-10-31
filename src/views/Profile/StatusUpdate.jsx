import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../../assets/Loading.svg';
import './styles/Feed.css';

import actions from '../../state/actions';

const {
  getActivity,
  getMyProfileValue,
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
    try {
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

      if (statusChanged) await this.props.getMyProfileValue('public', 'status');
      this.props.getActivity();
      this.setState({ saveLoading: false, disableSave: true });
      if (remove) this.setState({ status: '' });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { status, disableSave, saveLoading } = this.state;
    const { onOtherProfilePage, otherStatus } = this.props;

    return (
      <>
        {onOtherProfilePage && (
          <div
            className={`
          statusUpdate
          ${!otherStatus ? 'hideUpdateOnMobile' : ''}
          `
            }
          >
            <p className="statusUpdate__displayPublic">
              {otherStatus}
            </p>
          </div>)}

        {!onOtherProfilePage && (
          <div className="statusUpdate">
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

      </>
    );
  }
}

StatusUpdate.propTypes = {
  status: PropTypes.string,
  otherStatus: PropTypes.string,
  getActivity: PropTypes.func.isRequired,
  getMyProfileValue: PropTypes.func.isRequired,
  box: PropTypes.object,
  location: PropTypes.object.isRequired,
  onOtherProfilePage: PropTypes.bool,
};

StatusUpdate.defaultProps = {
  box: {},
  status: '',
  otherStatus: '',
  onOtherProfilePage: false,
};

function mapState(state) {
  return {
    box: state.myData.box,
    status: state.myData.status,
    otherStatus: state.otherProfile.otherStatus,
    onOtherProfilePage: state.uiState.onOtherProfilePage,
  };
}

export default withRouter(connect(mapState,
  {
    getActivity,
    getMyProfileValue,
  })(StatusUpdate));
