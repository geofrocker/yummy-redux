import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Review } from '../components/reviews/Reviews';

describe('add recipe component', () => {
  const props = {
    history: {
      push: () => {},
      goBack: () => {},
    },
    match: {
      params: {},
    },
    reviews: [{ review_id: 1, content: 'lorem' }],
    recipeData: [{ title: 'Lorem ipsum' }],
    loadRecipe: () => Promise.resolve(),
    loadReviews: () => Promise.resolve(),
    createReview: () => Promise.resolve(),
    upvoteRecipe: () => Promise.resolve(),
  };
  const wrapper = mount(<Review {...props} />);
  const preventDefault = jest.fn();

  it('renders the AddRecipe class', () => {
    expect(wrapper.find('.Review')).toHaveLength(1);
  });

  it('renders ten div jsx elements', () => {
    expect(wrapper.find('div')).toHaveLength(10);
  });

  it('renders the the add review form and submit data', () => {
    wrapper.setState({ content: 'awesome' });
    wrapper.find('#review-form').simulate('submit', { preventDefault });
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(preventDefault).toBeCalled();
  });

  it('render the inputs', () => {
    expect(wrapper.find('#content')).toHaveLength(1);
  });

  it('renders five buttons jsx elements', () => {
    expect(wrapper.find('.btn')).toHaveLength(5);
  });
  it('renders btn-group class jsx elements', () => {
    expect(wrapper.find('.btn-group')).toHaveLength(1);
  });
  it('renders form-group class jsx elements', () => {
    expect(wrapper.find('.form-group')).toHaveLength(2);
  });
  it('renders jumbotron class jsx elements', () => {
    expect(wrapper.find('.jumbotron')).toHaveLength(2);
  });

  it(' handle upvoting a recipe', () => {
    wrapper.find('#upvote').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it(' handle going back to previous page ', () => {
    wrapper.find('#goBack').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
