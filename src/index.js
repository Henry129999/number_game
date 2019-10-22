import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      { renderRoutes(routes) }
    </BrowserRouter>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
