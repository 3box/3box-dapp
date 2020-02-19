import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { timeSince } from '../../../../utils/time';

class LinkedAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyAddressSuccessful: false,
    };
  }

  copyAddress = (address) => {
    const textArea = document.createElement('textarea');

    textArea.value = address;

    document.body.appendChild(textArea);
    textArea.focus({
      preventScroll: true,
    });
    textArea.select();
    document.execCommand('copy');

    setTimeout(() => {
      this.setState({ copyAddressSuccessful: true });
    }, 1);
    setTimeout(() => {
      this.setState({ copyAddressSuccessful: false });
    }, 2000);

    document.body.removeChild(textArea);
  }

  render() {
    const { linkedAddresses, ensNames } = this.props;
    const { copyAddressSuccessful } = this.state;

    return (
      <div className="settings_mainView">
        <div className="settings_mainView_linkedAddressWrapper">
          {linkedAddresses.map((linked, i) => (
            <>
              <div className="settings_tile_context">
                <p className="settings_mainView_text">
                  {`Account ${i + 1}`}
                </p>

                <p className="settings_mainView_text">
                  {`Created ${timeSince(linked.timestamp * 1000)}`}
                </p>
              </div>

              <div
                key={linked.address}
                className="settings_tile settings_tile-clickableTile linkedAccountTile"
                onClick={() => this.copyAddress(linked.address)}
                onKeyPress={() => this.copyAddress(linked.address)}
                tabIndex={0}
                role="button"
              >
                <p>
                  {linked.address}
                </p>

                {!!ensNames[i] && ensNames[i].map((ens) => (
                  <p className="settings_ensNames">
                    {ens.name}
                  </p>
                ))}
              </div>

              <p className="settings_mainView_text">
                {`${copyAddressSuccessful ? 'Success' : 'Click to copy'}`}
              </p>
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default LinkedAccounts;

LinkedAccounts.propTypes = {
  linkedAddresses: PropTypes.array.isRequired,
  ensNames: PropTypes.array.isRequired,
};