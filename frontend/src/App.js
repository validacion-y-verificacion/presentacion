import './App.css';
import { Route } from "wouter";
import React from "react";

import useToken from "./components/useToken";
import Login from "./components/login";
import Inicio from './components/inicio';

function App() {
  const {token, setToken} = useToken();
  console.log(token)
  if (!token) { 
    return (<Login setToken={setToken} />)
  }

  return (<div className="App">
  <Route component={Inicio} path="/" />
</div>);
}

export default App;
