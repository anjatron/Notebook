'use strict';
import 'babel-polyfill';
import 'regenerator-runtime/runtime'

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
// import { createBrowserHistory } from 'history'

import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

import NotebookReducer from 'pages/reducers';
import {notebookSaga} from 'sagas/saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(NotebookReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(notebookSaga);

// ROOT APP
import Notebook from './app';

// ROUTES
import ContentViewContainer from 'pages/containers/smartContentView';
import NoteEditorContainer from 'pages/containers/smartNoteEditor';
import FolderContainer from 'pages/containers/smartFolderEditor';
import AccountContainer from 'pages/containers/smartAccount';

import LoginPage from 'pages/containers/smartLogin';

class App extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <Provider store={store}>
          <Router>
            <Notebook>
                <Route exact path="/" component={LoginPage} />
                <Route path="/home" component={ContentViewContainer} />
                <Route path="/account" component={AccountContainer}/>
                <Route path="/folder/:folderId" component={FolderContainer}/>
                <Route path="/note/:noteId" component={NoteEditorContainer}/>
            </Notebook>
          </Router>
        </Provider>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('root-container'));