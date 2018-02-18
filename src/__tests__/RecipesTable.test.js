import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { RecipesTable } from '../components/dashboard/recipesTab/RecipesTable';
import toJson from 'enzyme-to-json';

describe('the Recipe Table component', () => {
  const props = {
    str: {},
    history: {
      push: () => {},
    },
    categories: [{ cat_id: 1, cat_name: 'lorem' }],
    recipes: [{ recipe_id: 1, title: 'Lorem', ingredients: 'Ipsum' }],
    loadRecipes: () => Promise.resolve(),
    loadCategories: () => Promise.resolve(),
    deleteRecipe: () => Promise.resolve(),

  };
  const wrapper = mount(<RecipesTable {...props} />);
  const preventDefault = jest.fn();

  it('renders the RecipesTable class', () => {
    expect(wrapper.find('.RecipesTable')).toHaveLength(1);
  });

  it('renders the Modal', () => {
    expect(wrapper.find('Modal')).toHaveLength(2);
  });

  it('renders the Recipe table rows', () => {
    expect(wrapper.find('RecipeTableRows')).toHaveLength(1);
  });

  it('renders the Pagination', () => {
    expect(wrapper.find('Pagination')).toHaveLength(1);
  });

  it('renders ten div jsx elements', () => {
    expect(wrapper.find('div')).toHaveLength(10);
  });
  it('renders search bar', () => {
    expect(wrapper.find('#search')).toHaveLength(1);
  });

  it('renders pagination', () => {
    wrapper.setState({ data: [{ a: 'general' }] });
    expect(wrapper.find('.pagination')).toHaveLength(1);
    expect(wrapper.find('.page-link')).toHaveLength(3);
  });

  it('renders search input', () => {
    expect(wrapper.find('#search')).toHaveLength(1);
  });

  it(' handle going back to previous page ', () => {
    wrapper.find('#prevPage').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it(' handle going back to next page ', () => {
    wrapper.find('#nextPage').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it(' handles search feature ', () => {
    wrapper.find('#search').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it(' handle deleting the recipe ', () => {
    wrapper.find('#delete').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
