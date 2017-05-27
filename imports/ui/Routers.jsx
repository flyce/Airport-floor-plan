import React from 'react';
import { BrowserRouter as Router, Route, Link, IndexRoute, Redirect, Switch } from 'react-router-dom';

import App from './App.jsx';
import Login from './Login.jsx';
import Error from './Error.jsx';
import People from './PeopleTest.jsx';
import Similar from './Similar.jsx';
import Plot from './Plot.jsx';

export const renderRoutes = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/app" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/people" component={People}/>
                <Route path="/similar" component={Similar}/>
                <Route path="/plot" component={Plot}/>
                <Route path="/user" render={props => (
                    <div>
                        <App redirect="User" title="用户管理"/>
                    </div>
                )} />
                <Route path="/draw" render={props => (
                    <div>
                        <App redirect="Draw" title="活动轨迹监测"/>
                    </div>
                )} />
                <Route path="/simi" render={props => (
                    <div>
                        <App redirect="similar" title="用户管理"/>
                    </div>
                )} />
                <Route component={NoMatch}/>
            </Switch>
        </div>
    </Router>
);

const Home = () => (
    <div>
        <h2>Home</h2>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/app">app</Link></li>
            <li><Link to="/login">login</Link></li>
            <li><Link to="/test">test</Link></li>
            <li><Link to="/user">user</Link></li>
            <li><Link to="/nomatch">404</Link></li>
            {/*<li>shǎ&nbsp;bī</li>*/}
            {/*<li>&nbsp;好 &nbsp;人</li>*/}
        </ul>
    </div>
);

const NoMatch = ({ location }) => (
    <div>
        <Error path={location.pathname}/>
    </div>
);