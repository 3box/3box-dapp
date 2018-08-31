/* ------------------------- External Dependencies -------------------------- */
import { connect } from 'react-redux';

/* ------------------------- Internal Dependencies -------------------------- */
import SiteLayout from './component';

/* ------------------------ Initialize Dependencies ------------------------- */
import { getZones } from 'store/departments/theme/selectors'

/* -------------------------- Container Methods ----------------------------- */
function mapStateToProps(state) {
  const { header, footer, main, zones, regions } = getZones(state)
  return {
    header, footer, main, zones, regions
  };
}

export default connect(mapStateToProps)(SiteLayout);
