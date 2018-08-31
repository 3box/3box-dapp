/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { Switch } from 'react-router-dom';
/* ------------------------- Internal Dependencies -------------------------- */
import siteRoutes from 'routes'
import { 
  Route, Absolute
 } from 'atomic'
 // Components & Layout
 import RegionBranding from 'components/regions/RegionBranding'
 // Zones
import SiteHeader from 'layout/zones/SiteHeader'
import SiteMain from 'layout/zones/SiteMain'
import SiteFooter from 'layout/zones/SiteFooter'
import { Footer }  from 'components/zones'

/* ---------------------------- Module Package ------------------------------ */
export default props => (
<Absolute left right top bottom>
  <RegionBranding/>
  {/* Header Zone */}
  {!props.zones.header ? null: (
    <SiteHeader {...props.header.layout} >
      <Switch>
        { siteRoutes.map(route=> !route.header ? null : <Route exact path={route.path} component={route.header} />)}
      </Switch>
    </SiteHeader>
  )}


  {/* Main Zone */}
  {!props.zones.main ? null: (
    <SiteMain {...props.main.layout}>
      <Switch>
        { siteRoutes.map(route=> !route.main ? null : <Route exact path={route.path} component={route.main} />)}
      </Switch>
    </SiteMain>
  )}

  {/* Footer Zone */}
  {!props.zones.footer ? null :(
    <SiteFooter {...props.footer.layout}>
      <Footer/>
    </SiteFooter>
  )}
</Absolute>)

