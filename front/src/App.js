import logo from "./logo.svg";
import "./App.css";
import axios, { Axios } from "axios";
import { useEffect } from "react";
import querystring from "querystring"

function App() {
    axios.post("http://localhost:4000/api/v1/user/signIn",{
      "username":"adrien",
      "password":"dox230895"
  },{withCredentials:true,credentials:'include'})
  return (<div>
    sdqkdjdqs
  </div>);
}

export default App;
