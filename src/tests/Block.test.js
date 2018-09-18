import React from 'react';
import ReactDOM from 'react-dom';
import Block from '../components/Block';
import {
  renderWithIntl,
  rendererCreateWithIntl,
} from './helper';

const mockPropsNoConnection = {
  web3: null,
};

const mockPropsConnected = {
  web3: {},
};

test('renders without crashing', () => {
  const div = document.createElement('div');
  renderWithIntl(<Block {...mockPropsNoConnection} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('render correctly when no web3 connection', () => {
  const component = rendererCreateWithIntl(<Block {...mockPropsNoConnection} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render correctly with web3 connection', () => {
  const component = rendererCreateWithIntl(<Block {...mockPropsConnected} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
