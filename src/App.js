import React ,{useState} from "react";
//import {Avatar} from "@mui/material @emotion/react @emotion/styled"
import './App.css';
import Chat from "./Chat";
import Sidebar from"./Sidebar";
import Login from "./Login";
import {useStateValue} from "./Stateprovider"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {
  const [{user}, dispatch]= useStateValue();
  return (
    <div className="app">
      {!user? (<Login/>):(
        <div className="app_body">
          
          <Router>
          <Sidebar/>
            <Routes>
           
              <Route path="/rooms/:roomId"
             element= {
              <Chat/>}/>
              
             
              
              

            
              <Route path ="/"
              element= {<Chat/>}/>
              
                
            </Routes>
          </Router>

         </div>

      )}
         
    </div>
  );
}

export default App;
