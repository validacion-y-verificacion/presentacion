import './App.css';
import { Route } from "wouter";
import React from "react";

import useToken from "./components/useToken";
import Login from "./components/login";
import Inicio from './components/inicio';
import NavBar from './components/navbar';
import Mis_prestamos from './components/mis_prestados';
import Perfil_libro from './components/perfil_libro';
import Agregar_material from './components/agregar_material';
import Editar_libro from './components/editar_material';

function App() {
  const {token, setToken} = useToken();
  if (!token) { 
    return (<Login setToken={setToken} />)
  }

  return (<div className="App">
    <NavBar></NavBar>
    <Route component={Inicio} path="/" />
    <Route component={Mis_prestamos} path="/mis-prestamos" />
    <Route component={Perfil_libro} path="/material-estudio/:keyword" />
    <Route component={Agregar_material} path="/agregar-material" />
    <Route component={Editar_libro} path="/editar-material/:keyword" />
</div>);
}

export default App;
