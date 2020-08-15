import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import AdminPanel from './components/AdminPanel';
import SubmitPage from './components/SubmitPage';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/admin' component={AdminPanel} />
        <Route path='/submit' component={SubmitPage} />
      </Layout>
    );
  }
}
