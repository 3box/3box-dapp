import React from 'react';
import ReactDOM from 'react-dom';
import NoMatch from '../components/NoMatch';
import {
  renderWithIntl,
  rendererCreateWithIntl,
} from './helper';

test('renders without crashing', () => {
  const div = document.createElement('div');
  renderWithIntl(<NoMatch />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('render correctly', () => {
  const component = rendererCreateWithIntl(<NoMatch />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
