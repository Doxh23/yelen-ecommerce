import axios from "axios";
import React from "react";

const SignIn = () => {
  const [login, setlogin] = React.useState({ username: "", password: "" });
  console.log(login);
  const handleChange = (e) => {
    const value = e.target.value;
    setlogin({ ...login, [e.target.name]: value });
  };
  const fetchData = async () => {
    let data = await axios.post("/api/v1/user/login", login).then((res) => {
      console.log(res.data);
      window.location = '/'
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
  React.useEffect(() => {}, []);
  return (
    <>
      <div className="Login">
        <div>{/** */ <img src="" alt="" />}</div>

        <div>
          <div className="logo"></div>
          <div className="title"></div>
          <div className="sous-titre"></div>
          <div className="form">
            <form action="" onSubmit={handleSubmit} method="post">
              <label htmlFor="username">email</label>
              <input
                type="username"
                value={login.username}
                onChange={handleChange}
                name="username"
              />
              <label htmlFor="password"></label>
              <input
                value={login.password}
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
    </>
  );
};

export default SignIn;
