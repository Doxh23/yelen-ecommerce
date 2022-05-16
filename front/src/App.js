import logo from "./logo.svg";
import "./App.css";
import axios, { Axios } from "axios";
import { useEffect } from "react";
import querystring from "querystring"

function App() {
    axios.post("/api/v1/user/login",{
      "username":"adrien",
      "password":"dox230895"
  })
  return (<div>
    sdqkdjdqs
  </div>);
}

export default App;
