import './App.css';
import Login from './components/login/Login.component.jsx';
import Cadastro from './components/cadastro/Cadastro.component.jsx';


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Login/>
           <Cadastro/>
      </header>
    </div>
  );
}

export default App;
