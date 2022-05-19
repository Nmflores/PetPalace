import { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Outlet} from 'react-router-dom';
import Perfil from "./routes/perfil/Perfil.component";
import Menu from "./components/menu/Menu.component";
import Login from "./components/login/Login.component";
import Cadastro from "./components/cadastro/Cadastro.component";


function App() {
  const Navigation = () => {
      return(
        <div>
          <div><h1>Nav Placeholder</h1></div>
          <Outlet />
        </div>
        
      )
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="profile" element={<Perfil />}>
        </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
