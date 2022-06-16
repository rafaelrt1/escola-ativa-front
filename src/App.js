import Login from './components/Login';
import Cadastro from './components/Cadastro'
import CadastroAluno from './components/CadastroAluno'
import Tabela from './components/Tabela'
import RegistroDisciplina from './components/RegistroDisciplina'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Cadastro" element={<Cadastro />} />
          <Route exact path="/CadastroAluno" element={<CadastroAluno />} />
          <Route exact path="/Tabela" element={<Tabela />} />
          <Route exact path="/RegistroDisciplina" element={<RegistroDisciplina />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
