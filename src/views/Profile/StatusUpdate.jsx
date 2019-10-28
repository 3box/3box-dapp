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
      post: '',
      disableSave: true,
      saveLoading: false,
    };
  }

  componentDidMount() {
    // const { status } = this.props;
    // this.setState({ status });
  }

  handleFormChange = (e) => {
    this.setState({ post: e.target.value, disableSave: false });
  }

  // cancelChange = (e) => {
  //   e.preventDefault();
  //   const { status } = this.props;
  //   this.setState({ status, disableSave: true });
  // }

  updateComments = async () => {
    const { wallThread } = this.props;
    const thread = await wallThread.getPosts();
    // this.setState({ dialogue, dialogueLength: dialogue.length });
  }

  async handleSavePost(e, remove) {
    try {
      const {
        // status,
        post,
        disableComment,
        isMobile,
      } = this.state;
      const {
        joinThread,
        thread,
        updateComments,
        openBox,
        box,
        loginFunction,
        ethereum
      } = this.props;

      e.preventDefault();
      this.setState({ saveLoading: true });

      // const statusChanged = status !== this.props.status;

      const updatedComment = post.replace(/(\r\n|\n|\r)/gm, '');
      if (disableComment || !updatedComment) return;

      // this.inputRef.current.blur();
      // this.inputRef.current.style.height = (isMobile) ? '64px' : '74px';
      this.setState({ postLoading: true, post: '' });

      try {
        const res = await this.props.wallThread.post(post);
        console.log('res', res);
        await this.updateComments();
        this.setState({ postLoading: false });
      } catch (error) {
        console.error('There was an error saving your post', error);
      }

      // if value changed and is not empty, save new value, else remove value
      // if (statusChanged && status !== '') await box.public.set('status', status);
      // if ((statusChanged && status === '') || remove) await box.public.remove('status');
      // if (statusChanged) await this.props.getMyProfileValue('public', 'status');
      // this.props.getActivity();

      this.setState({ saveLoading: false, disableSave: true });
      // if (remove) this.setState({ status: '' });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      // status,
      disableSave,
      saveLoading,
      post,
      postLoading
    } = this.state;
    const { onOtherProfilePage, otherStatus } = this.props;

    return (
      <>
        {onOtherProfilePage && (
          <div
            className={`statusUpdate ${!otherStatus ? 'hideUpdateOnMobile' : ''}`}
          >
            <p className="statusUpdate__displayPublic">
              {otherStatus}
            </p>
          </div>
        )}

        {!onOtherProfilePage && (
          <div className="statusUpdate">
            {saveLoading && (
              <div className="statusUpdate__loading">
                <img src={Loading} alt="loading" />
              </div>
            )}

            <textarea
              name="name"
              type="text"
              value={post}
              placeholder="What's on your mind?"
              className="statusUpdate__field"
              // className={`input_form ${postLoading ? 'hidePlaceholder' : ''}`}
              onChange={(e) => this.handleFormChange(e)}
              // onChange={this.handleCommentText}
              // onFocus={this.handleLoggedInAs}
              // onBlur={this.handleLoggedInAs}
              ref={this.inputRef}
            />

            {!disableSave
              && (
                <button
                  type="button"
                  className="statusUpdate__button statusUpdate__button--save"
                  onClick={(e) => this.handleSavePost(e)}
                >
                  Save
                </button>
              )}

            {/* {!disableSave
              && (
                <button
                  type="button"
                  className="statusUpdate__button statusUpdate__button--cancel"
                  onClick={(e) => this.cancelChange(e)}
                >
                  Cancel
                </button>
              )} */}

            {/* {(disableSave && status !== '')
              && (
                <button
                  type="button"
                  className="statusUpdate__button statusUpdate__button--remove hideStatusButton"
                  onClick={(e) => this.handleSavePost(e, 'remove')}
                >
                  Remove
                </button>
              )} */}
          </div>
        )}
      </>
    );
  }
}

StatusUpdate.propTypes = {
  // status: PropTypes.string,
  otherStatus: PropTypes.string,
  getActivity: PropTypes.func.isRequired,
  getMyProfileValue: PropTypes.func.isRequired,
  box: PropTypes.object,
  wallThread: PropTypes.object,
  location: PropTypes.object.isRequired,
  onOtherProfilePage: PropTypes.bool,
};

StatusUpdate.defaultProps = {
  box: {},
  // status: '',
  otherStatus: '',
  onOtherProfilePage: false,
};

function mapState(state) {
  return {
    box: state.myData.box,
    // status: state.myData.status,
    wallPosts: state.myData.wallPosts,
    wallThread: state.myData.wallThread,

    otherStatus: state.otherProfile.otherStatus,

    onOtherProfilePage: state.uiState.onOtherProfilePage,
  };
}

export default withRouter(connect(mapState,
  {
    getActivity,
    getMyProfileValue,
  })(StatusUpdate));
