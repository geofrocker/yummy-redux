import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../components/App';

describe('App component', () => {
  const wrapper = shallow(<App />);

  it('renders two div jsx elements', () => {
    wrapper.setState({ isLoggedIn: true });
    expect(wrapper.find('div')).toHaveLength(2);
  });

  it('renders Router', () => {
    expect(wrapper.find('Nav')).toHaveLength(1);
    expect(wrapper.find('Switch')).toHaveLength(1);
    expect(wrapper.find('Route')).toHaveLength(7);
  });
});

