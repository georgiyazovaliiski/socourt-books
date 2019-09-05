import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Link} from 'react-router-dom'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Route} from "react-router";
import Books from "./components/Books";
import NavBar from "./components/NavBar";
import Book from "./components/Book";
import store from "./store";
import {Provider} from "react-redux";

import {get} from './services/bookService'
import CurrBook from "./components/CurrBook";
import LoginForm from "./components/user/LoginForm";

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                    <div className={'row'}>
                        <div className={'col-md-3'}>
                            <NavBar/>
                        </div>
                        <div className={'col-md-9'}>
                            <Route path="/" exact component={Books} />
                            <Route path="/books/" component={Books} />
                            <Route path="/book/:id" component={CurrBook} />
                            <Route path="/auth" exact component={LoginForm}/>
                        </div>
                    </div>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;