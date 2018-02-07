import pagination from './pagination';

export default{
  categories: {
    categories: [],
    category: [],
    pagination,
    message: '',
  },
  recipes: {
    review: [],
    recipe: [],
    reviews: [],
    recipes: [],
    pagination,
    message: '',
  },
  auth: {
    message: '',
    status: '',
  },
  ajaxCallsInProgress: 0,
};
