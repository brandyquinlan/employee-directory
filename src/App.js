import React from 'react'
import './App.css';
import Header from './components/Header'
import Container from './components/Container'
import Employees from './components/Employees'
import SearchForm from './components/SearchForm'

function App() {
  return (
    <div className="App">
     <Header/>
     <Container/>
     <Employees/>
     <SearchForm/>
    </div>
  );
}

export default App;
