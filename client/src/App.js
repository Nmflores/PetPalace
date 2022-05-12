import { useState, useEffect } from "react";
import './App.css';
import CardListUsers from "./components/card-users-list/card-users-list.component";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/users")
      .then((response) => response.json())
      .then((users) => setUsers(users));
  }, []);


  return (
    <div className="App">
      <header className="App-header">
      <CardListUsers users={users}/>
      </header>
    </div>
  );
}

export default App;
