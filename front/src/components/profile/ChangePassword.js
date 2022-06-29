import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
const ChangePassword = () => {
  const [changePasswordData, setchangePasswordData] = useState({
    actualPassword: "",
    newPassword: "",
    checkNewPassword: "",
  });
  const handleChangePassword = async() => {
    let data =await axios
      .put("/api/v1/me/updatepassword", changePasswordData).then((res)=>{
        <Navigate  to="/logout"/>
      })
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setchangePasswordData({ ...changePasswordData, [e.target.name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangePassword();
  };

  console.log(changePasswordData);
  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="actualPassword"> Actual password</label>
      <input
        type="password"
        value={changePasswordData.actualPassword}
        onChange={handleChange}
        name="actualPassword"
        id="actualPassword"
      />
      <label htmlFor="newPassword"> New Password</label>
      <input
        type="password"
        value={changePasswordData.newPassword}
        onChange={handleChange}
        name="newPassword"
        id="newPassword"
      />
      <label htmlFor="newPasswordCheck">checking new Password</label>
      <input
        type="password"
        value={changePasswordData.checkNewPassword}
        onChange={handleChange}
        name="checkNewPassword"
        id="checkNewPassword"
      />
      <button type="submit" value="" >submit</button>
    </form>
  );
};

export default ChangePassword;
