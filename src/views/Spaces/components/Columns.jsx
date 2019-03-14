import React from 'react';
import PropTypes from 'prop-types';

import Info from '../../../assets/Details.svg';
import '../styles/Spaces.css';

const Columns = ({ spaceToRender }) => (
  <React.Fragment>
    <section className="data__space">
      <h2 className="data__space__title">{spaceToRender}</h2>
      <img className="data__space__info" src={Info} alt="info" />
    </section>

    <section className="data__categories">
      <span className="data__categories__title">Name</span>
      <span className="data__categories__title">Content</span>
      <span className="data__categories__title">Space</span>
      <span className="data__categories__title">Type</span>
      <span className="data__categories__title">Privacy</span>
      <span className="data__categories__title">Last Updated</span>
    </section>
  </React.Fragment>
);

Columns.propTypes = {
  spaceToRender: PropTypes.string.isRequired,
};

// VaultRow.defaultProps = {
//   box: {},
// };

export default Columns;