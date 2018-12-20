import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('Button', () => {
  it('should render button element', () => {
    const component = renderer.create(<Button>test</Button>);
    const tree = component.toJSON();
    expect(tree.type).toBe('button');
  });

  it('should match snapshot without classes', () => {
    const component = renderer.create(<Button>test</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with a class', () => {
    const component = renderer.create(
      <Button className="class">test</Button>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with 2 classes', () => {
    const component = renderer.create(
      <Button className="class another-class">test</Button>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should contain passed class', () => {
    const component = renderer.create(
      <Button className="class">test</Button>,
    );
    const tree = component.toJSON();
    expect(tree.props.className).toContain('class');
  });

  it('should contain 2 passed classes', () => {
    const component = renderer.create(
      <Button className="class another-class">test</Button>,
    );
    const tree = component.toJSON();
    expect(tree.props.className).toContain('class');
    expect(tree.props.className).toContain('another-class');
  });

  it('should have passed children', () => {
    const component = renderer.create(
      <Button>super test text</Button>,
    );
    const tree = component.toJSON();
    expect(tree.children).toHaveLength(1);
    expect(tree.children).toContain('super test text');
  });

  it('should pass all unknown props down to button', () => {
    const callback = jest.fn(() => ({ a: 1 }));
    const component = renderer.create(
      <Button onClick={callback}>test</Button>,
    );
    const tree = component.toJSON();
    expect(tree.props.onClick).toBe(callback);
  });
});
