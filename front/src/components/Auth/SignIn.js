import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

const SignIn = () => {

  const logged = useSelector((state)=> state.logged)
  console.log(logged)
  if(logged){

    window.location = "/"
  }
  const [loginData, setloginData] = React.useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setloginData({ ...loginData, [e.target.name]: value });
  };
  const login = async () => {
    let data = await axios.post("/api/v1/user/login", loginData).then((res) => {
      window.location = "/";
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
  React.useEffect(() => {}, []);
  return (
    <>
      <div className="Login">
        <div>{/** */ <img src="" alt="" />}</div>

        <div>
            <div>
          <div className="logo"></div>
          <div className="title"></div>
          <div className="sous-titre"></div>
          <div className="form">
            <form action="" onSubmit={handleSubmit} method="post">
              <label htmlFor="username">email</label>
              <input
                type="username"
                value={loginData.username}
                onChange={handleChange}
                name="username"
                id="username"
              />
              <label htmlFor="password"></label>
              <input
                value={loginData.password}
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
              />
              <button type="submit"> submit</button>
            </form>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
