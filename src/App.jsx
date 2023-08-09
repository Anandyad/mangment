
import {  Routes, Route } from 'react-router-dom';
import IndexPage from './Pages/IndexPage';
import Login from './Pages/Login';
import Layout from './Layout';
import Register from './Pages/Register';
import axios from 'axios';
import React from 'react';

axios.defaults.baseURL='http://localhost:4000'
const App = () => {
  const userContext=React.createContext();
  userContext.Provider
  return (
    <>
    <userContext.Provider>
        <Routes>
        <Route  path='/'  element={<Layout/>}>
          
            <Route index  element={<IndexPage/>} />
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Register' element={<Register/>}/>
          
            </Route>
          </Routes>
          </userContext.Provider>
    </>
  );
};

export default App;
