import React from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import EntryDetail from './pages/EntryDetail'

import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/entries/:id" element={<EntryDetail />}></Route>
      </Routes>
    </Router>
  )
}

export default App
