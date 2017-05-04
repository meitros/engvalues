import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Card from '../Card';
import * as renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Card />,
  div);
});

it('renders text', () => {
  const component = renderer.create(
    <Card text="MAXIMUM FLUBSTEP"/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
