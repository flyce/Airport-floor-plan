import React from 'react';
import { BrowserRouter as Router, Route, Link, IndexRoute, Redirect, Switch } from 'react-router-dom';

import App from './App.jsx';
import Login from './Login.jsx';
import Draw from './Draw.jsx';
import Error from './Error.jsx';
import User from './User.jsx';
import Test from './Test.jsx'

export const renderRoutes = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Home}/>
                <PrivateRoute path="/app" component={App} />
                <Route path="/login" component={Login}/>
                <Route path="/test" component={Test}/>
                <Route path="/user" render={props => (
                    <div>
                        <App redirect="User"/>
                    </div>
                )} />
                <Route path="/draw" render={props => (
                    <div>
                        <App redirect="Draw"/>
                    </div>
                )} />
                <Route component={NoMatch}/>
            </Switch>
        </div>
    </Router>
);

const PrivateRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

const fakeAuth = {
    isAuthenticated: true,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

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