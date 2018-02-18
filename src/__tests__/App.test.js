import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../components/App';

describe('App component', () => {
  const wrapper = shallow(<App />);

  it('renders five div jsx elements', () => {
    expect(wrapper.find('div')).toHaveLength(2);
  });

  it('renders Router', () => {
    expect(wrapper.find('Router')).toHaveLength(0);
  });
});

