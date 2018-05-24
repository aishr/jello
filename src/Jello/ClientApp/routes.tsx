import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Cards from './components/Cards';

export const routes = <Layout>
    <Route exact path='/' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/home' component={Home} />
    <Route path='/cards' component={Cards} />
</Layout>;
