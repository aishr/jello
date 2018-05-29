import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/mainPages/Home';
import Login from './components/mainPages/Login';
import Register from './components/mainPages/Register';
import Cards from './components/mainPages/Cards';
import Settings from './components/mainPages/Settings';
import ErrorPage from './components/mainPages/ErrorPage';

export const routes = <Layout>
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/home' component={Home} />
        <Route path='/settings' component={Settings} />
        <Route path='/cards' component={Cards} />
        <Route path='*' component={ErrorPage} />
    </Switch>
</Layout>;
