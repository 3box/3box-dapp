import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getPublicGithub } from "../state/actions";

import "./styles/Nav.css";
import { verifyGithubAccount } from "../utils/accountVerifiers";

class VerifyGithubDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gistFile: "",
      error: undefined
    };
  }

  triggerGithubVerification = async () => {
    const { gistFile } = this.state;
    const { github, accountAddress, closeModal, box } = this.props;
    console.log({ gistFile, github });

    const result = await verifyGithubAccount(github, gistFile, accountAddress);

    if (result === true) {
      await box.public.set("githubVerificationLink", gistFile);
      await this.props.getPublicGithub();
      this.setState({ error: undefined });
      closeModal();
    } else {
      this.setState({
        error: result
      });
    }
  };

  render() {
    const { show, accountAddress, closeModal } = this.props;
    const { gistFile, error } = this.state;

    return (
      <div>
        <div className={`${show ? "showModal" : ""} modal__container modal--effect`}>
          <div className="modal">
            <div id="modal__copy__card">
              <h3>Verify your Github account</h3>
              <br />
              <p>
                In order to verify your Github account create a{" "}
                <a href="https://gist.github.com/" target="_blank" rel="noopener noreferrer">
                  Gist
                </a>{" "}
                file containing your address: <b>{accountAddress}</b>
              </p>
              <br />
              <br />

              <React.Fragment>
                <p>Link to the raw Gist file:</p>
                <input
                  name="github"
                  type="text"
                  id="modal__verify__github__gist"
                  value={gistFile}
                  onChange={e => {
                    this.setState({ gistFile: e.target.value });
                  }}
                />
                {error !== undefined && <p id="modal__verify__github__error">{error}</p>}

                <div id="edit__formControls">
                  <div id="edit__formControls__content">
                    <button
                      // disabled={disableSave}
                      onClick={this.triggerGithubVerification}
                    >
                      Verify
                    </button>
                    <span className="subtext" id="verify__github__cancel" onClick={closeModal}>
                      Cancel
                    </span>
                  </div>
                </div>
              </React.Fragment>
            </div>
          </div>
        </div>
        <div className="modal__overlay" />
      </div>
    );
  }
}

VerifyGithubDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  accountAddress: PropTypes.string,
  github: PropTypes.string
};

VerifyGithubDialog.defaultProps = {
  accountAddress: "",
  github: ""
};

function mapState(state) {
  return {
    box: state.threeBox.box,
    accountAddress: state.threeBox.accountAddress,
    github: state.threeBox.github
  };
}

export default withRouter(
  connect(
    mapState,
    { getPublicGithub }
  )(VerifyGithubDialog)
);
