import { useState, useEffect } from "react";
import './App.css';
import CardListUsers from "./components/card-users-list/card-users-list.component";
import CardListPets from "./components/card-pets-list/card-pets-list.component";
import CardListWorks from "./components/card-works-list/card-works-list.component";

function App() {
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/users")
      .then((response) => response.json())
      .then((users) => setUsers(users));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/pets")
      .then((response) => response.json())
      .then((pets) => setPets(pets));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/works")
      .then((response) => response.json())
      .then((works) => setWorks(works));
  }, []);
  

  return (
    <div className="App">
      <header className="App-header">
      <CardListUsers users={users}/>
      <CardListPets pets={pets}/>
      <CardListWorks works={works}/>
      </header>
    </div>
  );
}

export default App;
