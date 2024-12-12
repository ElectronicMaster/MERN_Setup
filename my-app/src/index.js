import React from 'react';
import ReactDOM from 'react-dom/client'; // import from 'react-dom/client' instead of 'react-dom'
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { BrowserRouter } from "react-router-dom"

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
