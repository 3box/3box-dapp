import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getPublicGithubVerificationLink } from "../state/actions";

import "./styles/Nav.css";
import Loading from "../assets/Loading.svg";

class VerifyGithubDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      gistFile: "",
      error: undefined
    };
  }

  triggerGithubVerification = async () => {
    const { gistFile } = this.state;
    const { github, accountAddress, closeModal, box } = this.props;
    console.log({ gistFile, github });

    // Make sure gist link belongs to the github link
    let verifiedLink = github.replace("https://github.com/", "https://gist.githubusercontent.com/");
    console.log({ verifiedLink });

    if (gistFile.startsWith(verifiedLink)) {
      let gistFileContent = await (await fetch(gistFile)).text();
      console.log({ gistFileContent });

      if (gistFileContent.includes(accountAddress)) {
        // eslint-disable-next-line no-undef
        await box.public.set("githubVerificationLink", gistFile);
        await this.props.getPublicGithubVerificationLink();
        this.setState({ error: undefined });
        closeModal();
      } else {
        this.setState({
          error: "The Gist file you submitted doesn't contain your address"
        });
      }
    } else {
      this.setState({
        error: "It seems the Gist file you submitted does't belong to the github account you added on your profile"
      });
    }
  };

  render() {
    const { show, accountAddress, closeModal } = this.props;
    const { isLoading, gistFile, error } = this.state;
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

              {isLoading && (
                <React.Fragment>
                  <img src={Loading} alt="Loading" id="modal__loadingGraphic--access" />
                </React.Fragment>
              )}

              {!isLoading && (
                <React.Fragment>
                  <p>Link to the raw Gist file:</p>
                  <input
                    name="github"
                    type="text"
                    id="modal__verify__githut__gist"
                    value={gistFile}
                    onChange={e => {
                      this.setState({ gistFile: e.target.value });
                    }}
                  />
                  {error && <p>Link to the raw Gist file:</p>}

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
              )}
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
    { getPublicGithubVerificationLink }
  )(VerifyGithubDialog)
);
