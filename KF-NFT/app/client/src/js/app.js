import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory, browserHistory } from "react-router";
import Home from './Pages/Home';
import Layout from "./components/Layout";
//import Verification from './Pages/Authy/Verification';
import Verification from './Pages/Authy/Verification';
const app = document.getElementById('app');

let routes = (
    <Route path="/" component={Home}>
        <IndexRoute component={Layout} />
        <Route path="Verification" name="Verification" component={Verification}></Route>
    </Route>
);

ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, app);

