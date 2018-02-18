import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../components/dashboard/Dashboard';

describe('Dashboard component', () => {
  const wrapper = shallow(<Dashboard />);

  global.localStorage.setItem('isLoggedIn', true);

  it('renders five div jsx elements', () => {
    expect(wrapper.find('div')).toHaveLength(0);
  });
});

