import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Username extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Username" />
      </div>
    );
  }
}

Username.propTypes = {
  title: PropTypes.string,
  key: PropTypes.string,
  finderToDisplay: PropTypes.string.isRequired,
  handleFinderToDisplay: PropTypes.func.isRequired,
};

Username.defaultProps = {
  title: '',
  key: '',
};

export default Username;