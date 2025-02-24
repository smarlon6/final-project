import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

import { Container } from "reactstrap"

import Header from './components/Header';
import Users from "./components/Users";
import Home from "./components/Home";
import Feedback from "./components/Feedback";
import Inscricao from "./components/Inscricao";

import './App.css'

function App() {

  return (
    <Router>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />
      <Container className="flex-grow-1 mt-5">
      <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/users" element={<Users/>} />
            <Route path="/feedback" element={<Feedback/>} />
            <Route path="/inscricao" element={<Inscricao/>} />
          </Routes>
      </Container>
      <footer>
        INFINET - MIT Full Stack 2025
      </footer>
      </div>

      
      </Router>
  )
}

export default App