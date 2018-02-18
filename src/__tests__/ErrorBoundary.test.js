import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from '../components/ErrorBoundary';

describe('ErrorBoundary component', () => {
  const wrapper = shallow(<ErrorBoundary />);

  it('renders five div jsx elements', () => {
    expect(wrapper.find('div')).toHaveLength(1);
  });
});

