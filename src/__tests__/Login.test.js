import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Login } from '../components/login/Login';

const props = {
  login: () => Promise.resolve(),
};

describe('login component', () => {
  const wrapper = shallow(<Login {...props} />);
  const preventDefault = jest.fn();

  expect(toJson(wrapper)).toMatchSnapshot();
  it('renders the Login class', () => {
    expect(wrapper.find('.Login')).toHaveLength(1);
  });

  it('renders five div jsx elements', () => {
    expect(wrapper.find('div')).toHaveLength(5);
  });
  it('renders the sign in form and submit data', () => {
    wrapper.setState({ email: 'geofrocker2@gmail.com', password: 'psalms' });
    wrapper.find('#login-form').simulate('submit', { preventDefault });
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(preventDefault).toBeCalled();
  });

  it('render the two inputs and hides password', () => {
    expect(wrapper.find('#password')).toHaveLength(1);
    expect(wrapper.find('#username')).toHaveLength(1);
    wrapper.find('#username').simulate('change', { target: { value: 'psalms' } });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
