import React, { Component, useState, useEffect } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
// page
import Home from './views/Home'
import Debug from './views/Debug'
import Example from './views/Example'
import Editor from './views/Editor'
import Doc from './views/Doc'

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
                    <Route path="/doc" component={Doc} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
