import React from 'react';
import ReactDOM from 'react-dom';
import Content from '../components/Content';
import {
  renderWithIntl,
  rendererCreateWithIntl,
} from './helper';

test('renders without crashing', () => {
  const div = document.createElement('div');
  renderWithIntl(<Content />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('render correctly', () => {
  const component = rendererCreateWithIntl(<Content />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
