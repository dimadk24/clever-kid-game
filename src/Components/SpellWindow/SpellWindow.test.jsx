import { shallow } from 'enzyme';
import React from 'react';
import SpellWindow from './SpellWindow';

describe('SpellWindow', () => {
  it('should have 2 buttons', () => {
    const wrapper = shallow(
      <SpellWindow onHeal={() => ({})} onAttack={() => ({})} />,
    );
    expect(wrapper).toContainMatchingElements(2, 'Button');
  });

  it('should call onHeal on heal button click', () => {
    const callback = jest.fn();
    const wrapper = shallow(
      <SpellWindow onHeal={callback} onAttack={() => ({})} />,
    );
    wrapper.find('Button.heal-button').simulate('click');
    expect(callback).toBeCalledTimes(1);
  });

  it('should call onAttack on attack button click', () => {
    const callback = jest.fn();
    const wrapper = shallow(
      <SpellWindow onHeal={() => ({})} onAttack={callback} />,
    );
    wrapper.find('Button.attack-button').simulate('click');
    expect(callback).toBeCalledTimes(1);
  });

  it('should call both onHeal and onAttack', () => {
    const onAttack = jest.fn();
    const onHeal = jest.fn();
    const wrapper = shallow(
      <SpellWindow onHeal={onHeal} onAttack={onAttack} />,
    );
    wrapper.find('Button.attack-button').simulate('click');
    wrapper.find('Button.heal-button').simulate('click');
    expect(onAttack).toBeCalledTimes(1);
    expect(onHeal).toBeCalledTimes(1);
  });
});
