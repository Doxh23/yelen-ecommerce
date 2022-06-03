import axios from "axios";
import React from "react";

const SignIn = () => {
  const [loginData, setloginData] = React.useState({
    username: "",
    password: "",
  });
  console.log(loginData)
  const handleChange = (e) => {
    const value = e.target.value;
    setloginData({ ...loginData, [e.target.name]: value });
  };
  const login = async () => {
    let data = await axios.post("/api/v1/user/login", loginData).then((res) => {
      console.log(res.data);
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
              />
              <label htmlFor="password"></label>
              <input
                value={loginData.password}
                onChange={handleChange}
                type="password"
                name="password"
                id=""
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
