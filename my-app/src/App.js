import React from 'react';
import { Button, Box, useColorMode } from '@chakra-ui/react';
import HomePage from './Pages/HomePage';
import CreatePage from './Pages/CreatePage';
import { Route,Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar"

const App = () => (
  <Box minH={"100vh"} >
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/create" element={<CreatePage/>}/>
    </Routes>
  </Box>
);

export default App;