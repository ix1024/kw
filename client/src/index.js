import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {createStore} from "redux";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from "./reducers/index";
import 'antd/dist/antd.css';
const root = document.getElementById('root');
let store = createStore(rootReducer);

ReactDOM.render( 
<Provider store={store}>
<App/>
</Provider> 
, root);


registerServiceWorker();