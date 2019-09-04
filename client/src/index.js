import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import store from "./store/index";

import {fetchBooks, getBooks} from "./actions";

window.appStore = store;
window.fetchBooks = fetchBooks;

store.subscribe(()=>{});

ReactDOM.render((<App />), document.getElementById('root'));
registerServiceWorker();
