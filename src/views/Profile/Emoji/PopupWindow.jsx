import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PopupWindow extends Component {

  componentDidMount() {
    this.scLauncher = document.querySelector('.input');
    this.scLauncher.addEventListener('click', this.interceptLauncherClick);
  }

  componentWillUnmount() {
    this.scLauncher.removeEventListener('click', this.interceptLauncherClick);
  }

  interceptLauncherClick = (e) => {
    const { isOpen, onClickedOutside } = this.props;
    const clickedOutside = !this.emojiPopup.contains(e.target) && isOpen;
    clickedOutside && onClickedOutside(e);
  }

  render() {
    const { isOpen, children, onInputChange } = this.props;

    return (
      <div className="sc-popup-window" ref={e => this.emojiPopup = e}>
        <div className={`sc-popup-window--cointainer ${isOpen ? '' : 'closed'}`}>
          <input
            onChange={onInputChange}
            className="sc-popup-window--search"
            placeholder="Search emoji..."
          />
          {children}
        </div>
      </div>
    );
  }
}

PopupWindow.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.object,
  onInputChange: PropTypes.func,
  onClickedOutside: PropTypes.func,
};

export default PopupWindow;
