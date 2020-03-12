import React, { Component, useState, useEffect } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
// page
import Home from './views/Home'
import Debug from './views/Debug'
import Example from './views/Example'
import Editor from './views/Editor'
import Empty from './views/Empty'
import Doc from './views/Doc'

import About from './views/About'
import Record from './views/Record'
import Renamer from './views/Renamer'

import Page from './components/Page'

import './reset.css'
import './App.css'
import './scss/common.scss'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Route path="/" exact component={Home} />
                    <Route path="/debug" component={Debug} />
                    <Route path="/editor" component={Editor} />
                    <Route path="/example" component={Example} />
                    <Route path="/empty" component={Empty} />
                    <Route path="/doc" component={Doc} />

                    <Route path="/about" component={About} />
                    <Route path="/records" component={Record} />
                    <Route path="/renamer" component={Renamer} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
