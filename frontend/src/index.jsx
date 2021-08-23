import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Views/App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Usuario from "./Components/Usuarios/Usuario";
import Cargo from './Components/Cargos/Cargo';
import Perfil from './Components/Perfis/Perfil';


ReactDOM.render(
  <React.Fragment>
    <App />
    <BrowserRouter> 
      <Switch>
        <Route path="/" exact={true} component={Usuario}/>
        <Route path="/cargos" component={Cargo}/>
        <Route path="/perfis" component={Perfil}/>
        
      </Switch>           
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);
