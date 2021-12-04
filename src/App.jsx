/*============================================== Importing Libraries ==============================================*/

import React from 'react';
import {
  BrowserRouter,
  Route
} from "react-router-dom";

/*============================================== Importing Assets And Files ==============================================*/

import './App.css';
import Main from './Main';
import Tasks from './tasks';





function App() {
  return (
      <BrowserRouter>
        <Route exact path="/"><Main/></Route>
        <Route exact path="/tasks"><Tasks/></Route>   
      </BrowserRouter>
  );
}

export default App;
