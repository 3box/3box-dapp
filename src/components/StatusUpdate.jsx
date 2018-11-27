import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/Feed.css';

class StatusUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  handleFormChange = (e, property) => {
    this.setState({ [property]: e.target.value, disableSave: false });
  }

  closeFileSizeModal = () => {
    this.setState({ showFileSizeModal: false });
  }

  render() {
    return (
      <div className="statusUpdate">

      </div>
    );
  }
}

StatusUpdate.propTypes = {
};

StatusUpdate.defaultProps = {
};

function mapState(state) {
  return {
  };
}

export default withRouter(connect(mapState,
  {
  })(StatusUpdate));