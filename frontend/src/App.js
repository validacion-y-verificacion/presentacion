import './App.css';
import { Route } from "wouter";
import React from "react";

import useToken from "./components/useToken";
import Login from "./components/login";
import Inicio from './components/inicio';
import NavBar from './components/navbar';
import Mis_prestamos from './components/mis_prestados';

function App() {
  const {token, setToken} = useToken();
  if (!token) { 
    return (<Login setToken={setToken} />)
  }

  return (<div className="App">
    <NavBar></NavBar>
    <Route component={Inicio} path="/" />
    <Route component={Mis_prestamos} path="/mis-prestamos" />
</div>);
}

export default App;
