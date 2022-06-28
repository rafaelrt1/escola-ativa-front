import Login from './components/Login';
import Cadastro from './components/Cadastro'
import CadastroAluno from './components/CadastroAluno'
import Tabela from './components/Tabela'
import DarNota from './components/DarNota'
import Turmas from './components/Turmas'
import Conteudos from './components/Conteudos'
import Disciplinas from './components/Disciplinas'
import VincularTurmaDisciplina from './components/VincularTurmaDisciplina'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Disciplinas />} />
          <Route exact path="/Cadastro" element={<Cadastro />} />
          <Route exact path="/CadastroAluno" element={<CadastroAluno />} />
          <Route exact path="/Tabela" element={<Tabela />} />
          <Route exact path="/Turmas" element={<Turmas />} />
          <Route exact path="/Conteudos" element={<Conteudos />} />
          <Route exact path="/Disciplinas" element={<Disciplinas />} />
          <Route exact path="/VincularTurmaDisciplina" element={<VincularTurmaDisciplina />} />
          <Route exact path="/DarNota" element={<DarNota />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
