import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { CategoriesTable } from '../components/dashboard/categoriesTab/CategoriesTable';
import toJson from 'enzyme-to-json';

describe('the category Table component', () => {
  const props = {
    str: {},
    history: {
      push: () => {},
    },
    categories: [{ cat_id: 1, cat_name: 'lorem', cat_desc: 'Ipsum' }],
    catData: [{ cat_id: 1, cat_name: 'lorem', cat_desc: 'Ipsum' }],
    recipes: [{ recipe_id: 1, title: 'Lorem', ingredients: 'Ipsum' }],
    loadRecipes: () => Promise.resolve(),
    loadCategories: () => Promise.resolve(),
    deleteCategory: () => Promise.resolve(),

  };
  const wrapper = mount(<CategoriesTable {...props} />);
  wrapper.setState({ categories: [{ cat_id: 1, cat_name: 'lorem' }] });
  const preventDefault = jest.fn();

  it('renders the Category table class', () => {
    expect(wrapper.find('.CategoriesTable')).toHaveLength(1);
  });

  it('renders the category Modal', () => {
    expect(wrapper.find('Modal')).toHaveLength(2);
  });

  it('renders the category Pagination', () => {
    expect(wrapper.find('Pagination')).toHaveLength(1);
  });

  it('renders seven div jsx elements', () => {
    expect(wrapper.find('div')).toHaveLength(7);
  });

  it('renders category pagination', () => {
    wrapper.setState({ data: [{ a: 'general' }] });
    expect(wrapper.find('.pagination')).toHaveLength(1);
    expect(wrapper.find('.page-link')).toHaveLength(3);
  });

  it(' handles clicks ', () => {
    expect(wrapper.find('#catPrevPage').simulate('click'));
    expect(wrapper.find('#catNextPage').simulate('click'));
    expect(wrapper.find('#catSearch').simulate('click'));
    expect(wrapper.find('#catDelete').simulate('click'));
  });
});
