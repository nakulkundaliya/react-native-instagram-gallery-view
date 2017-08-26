import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import RouterComponent from './Route';
import React, { Component } from 'react';

export default class App extends Component {
  render() {
      return (
        <Provider>
          <RouterComponent />
        </Provider>
      );
    }
}
