/* ------------------------- External Dependencies -------------------------- */
import { connect } from 'react-redux';

/* ------------------------- Internal Dependencies -------------------------- */
import ComponentRender from './render';

/* ----------------------- Redux | State Management  ------------------------ */
import { getZoneLayout } from 'store/departments/theme/selectors'

/* ---------------------------- Module Package ------------------------------ */

function mapStateToProps(state) {
  const layout = getZoneLayout(state, 'footer')
  return {layout};
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ComponentRender);
