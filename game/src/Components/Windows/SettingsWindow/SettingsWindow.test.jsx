import React from 'react';
import renderer from 'react-test-renderer';
import SettingsWindow from './SettingsWindow';

describe('SettingsWindow', () => {
  it('should render button', () => {
    const settings = renderer.create(<SettingsWindow onChangeSound={() => ({})} />);
    const button = settings.root.findByType('button');
    expect(button).toBeTruthy();
  });

  it('should change icon classes on change sound', () => {
    const settings = renderer.create(
      <SettingsWindow onChangeSound={() => ({})} />,
    );
    const iconElement = settings.root.findByType('i');
    const classBefore = iconElement.props.className;
    settings.getInstance().onChangeSound();
    const classAfter = iconElement.props.className;
    expect(classAfter).not.toBe(classBefore);
  });

  it('should change icon classes back after double on change sound', () => {
    const settings = renderer.create(
      <SettingsWindow onChangeSound={() => ({})} />,
    );
    const iconElement = settings.root.findByType('i');
    const classBefore = iconElement.props.className;
    const instance = settings.getInstance();
    instance.onChangeSound();
    instance.onChangeSound();
    const classAfter = iconElement.props.className;
    expect(classAfter).toBe(classBefore);
  });

  it('should call provided callback when sound state changes', () => {
    const callback = jest.fn();
    const settings = renderer.create(
      <SettingsWindow onChangeSound={callback} />,
    );
    const instance = settings.getInstance();
    instance.onChangeSound();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toBeCalledWith(false);
    callback.mockClear();
    instance.onChangeSound();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toBeCalledWith(true);
  });
});
