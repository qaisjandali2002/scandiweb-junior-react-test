import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import ContextProvider from './Context';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';


export class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <ContextProvider>
            <Navbar />
            <Route path='/' exact render={() => <Redirect to='/tech' />} />
            <Route path='/:category' component={Products} />
          </ContextProvider>
        </Switch >
      </Router>
    )
  }
}


export default App;
