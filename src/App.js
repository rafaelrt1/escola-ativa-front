import logo from './logo.svg';
import './App.css';
import Login from './components/Login.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
