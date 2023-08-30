import logo from './logo.svg';
import './App.css';
import MyAsideBar from "./Components/asideBar";
import MyNavBar from "./Components/navBar";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { PanneList } from './Pages/PanneList';
import { useRef, useState } from 'react';
import Login from './Pages/Login';
import DetailsPanne from './Pages/DetailsPanne';
import Users from './Pages/Users';
import { useAuthContext } from './hooks/useAuthContext';
function App() {
  const [act, setAct] = useState(false);
  const { user } = useAuthContext();

  return (
    
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/liste_des_pannes' element={user ? <PanneList /> : <Navigate to="/" />} />
          <Route path='/Details' element={user ? <DetailsPanne /> : <Navigate to="/" />} />
          <Route path='/' element={
              !user ? (
                <Login />
              ) : (
                <Navigate to="/liste_des_pannes" />
              )
            }/>
          <Route path='/Utilisateurs' element={user ? <Users/> : <Navigate to="/" />}/>
        </Routes>
      </main>
    </BrowserRouter>
      
  );
}

export default App;
