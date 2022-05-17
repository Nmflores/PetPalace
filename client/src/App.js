import { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Perfil from "./pages/Perfil";
import Menu from "./components/menu/Menu.component";
import Login from "./components/login/Login.component";
import Cadastro from "./components/cadastro/Cadastro.component";


function App() {
  {/*const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/users")
      .then((response) => response.json())
      .then((users) => setUsers(users));
  }, []); */}

  return (
    <div className="App">
      <Menu />
       {/*<CardListUsers users={users}/>*/} 
    </div>
  );
}

export default App;
