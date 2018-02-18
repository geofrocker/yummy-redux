import React from 'react';
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
    // loadRecipe: () => Promise.resolve(),
    // addRecipe: () => Promise.resolve(),
    // updateRecipe: () => Promise.resolve(),
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

  it(' handle going back to  category previous page ', () => {
    wrapper.find('#catPrevPage').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it(' handle going back to next category page ', () => {
    wrapper.find('#catNextPage').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it(' handles category search feature ', () => {
    wrapper.find('#catSearch').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  // it(' handle editing the recipe ', () => {
  //   wrapper.find('#edit').simulate('click', { preventDefault });
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  it(' handle deleting the category ', () => {
    wrapper.find('#catDelete').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
