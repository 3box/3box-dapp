import React, { Component } from 'react';

class DynamicImports extends Component {
  state = {
    component: null,
  }

  componentWillMount() {
    const { load } = this.props;
    load().then(mod => this.setState(() => ({
      component: mod.default,
    })));
  }

  render() {
    return this.props.children(this.state.component);
  }
}

export const Nav = props => (
  <DynamicImports load={() => import('./components/Nav/Nav')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);

export const MyProfile = props => (
  <DynamicImports load={() => import('./views/Profile/MyProfile')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);

export const Spaces = props => (
  <DynamicImports load={() => import('./views/Spaces/Spaces')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);

export const EditProfile = props => (
  <DynamicImports load={() => import('./views/Profile/EditProfile')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);

export const PubProfile = props => (
  <DynamicImports load={() => import('./views/Profile/PubProfile')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);

export const AppModals = props => (
  <DynamicImports load={() => import('./components/AppModals')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);

export const AppHeaders = props => (
  <DynamicImports load={() => import('./components/AppHeaders')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);

export const NavLanding = props => (
  <DynamicImports load={() => import('./components/NavLanding/NavLanding')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);

export const Careers = props => (
  <DynamicImports load={() => import('./views/Landing/Careers')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);

export const Terms = props => (
  <DynamicImports load={() => import('./views/Landing/Terms')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);

export const Privacy = props => (
  <DynamicImports load={() => import('./views/Landing/Terms')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);