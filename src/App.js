import Login from './components/Login';
import Cadastro from './components/Cadastro'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Cadastro" element={<Cadastro />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
