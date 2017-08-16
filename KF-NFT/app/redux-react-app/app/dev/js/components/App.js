//Bundles containers
import React from 'react';
import UserList from '../containers/user-list';
import UserDetails from '../containers/user-detail';

require('../../scss/style.scss');

const App = () => (
    <div>
    	<h1>Managing Weight</h1>
    	<h2>Obesity</h2>
    	<p>Over 60 percent of U.S. adult women are overweight, according to 2007 estimates from the National Center for Health Statistics of 
    	the Center for Disease Control and Prevention. Just over one-third of overweight adult women are obese.</p>
        <h3>Find out more</h3>
        <UserList />
        <hr />
        <UserDetails />
    </div>
);

export default App;
