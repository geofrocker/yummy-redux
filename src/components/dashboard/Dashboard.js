import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Categories from './Categories';
import RecipesTable from './RecipesTable';

const Dashboard = (props) => {
  if (!localStorage.getItem('isLoggedIn')) {
    props.history.push('/login');
  }
  return (
    <div className="Dashboard">
      <div className="panel panel-default">
        <div className="panel-body">
          <Tabs defaultActiveKey={1} animation onSelect={this.handleCategoryPagination} id="myContent">
            <Tab eventKey={1} title="Recipes">
              {/* <ErrorBoundaryAppContainer> */}
              <RecipesTable />
              {/* </ErrorBoundaryAppContainer> */}
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
