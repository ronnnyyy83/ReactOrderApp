import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './server/serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import repositoryReducer from './store/reducers/repositoryReducer';
import postalCodeReducer from './store/reducers/postalCodeReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import '../node_modules/toastr/build/toastr.min.css';
import jiraReducer from './store/reducers/jiraReducer';
 
const rootReducers = combineReducers({
    repository: repositoryReducer,
    postalCode: postalCodeReducer,
    jira: jiraReducer
})

const store = createStore(rootReducers, applyMiddleware(thunk));
 
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
