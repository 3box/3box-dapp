import React, { Component } from 'react';

class DynamicImport extends Component {
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

export const MainApp = props => (
  <DynamicImport load={() => import('./MainApp')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImport>
);

export const PreviewComponents = props => (
  <DynamicImport load={() => import('./PreviewComponents')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImport>
);