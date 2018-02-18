import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Categories from './categoriesTab/CategoriesTable';
import RecipesTable from './recipesTab/RecipesTable';


const Dashboard = () => {
  if (!localStorage.getItem('isLoggedIn')) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="Dashboard">
      <div className="panel panel-default">
        <div className="panel-body">
          <Tabs defaultActiveKey={1} animation id="myContent">
            <Tab eventKey={1} title="Recipes">
              <RecipesTable />
            </Tab>
            <Tab eventKey={2} title="Categories">
              <Categories />

            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
