import React from 'react'

const ChangePassword = () => {
  return (
    <form action="" method="post">
        <label htmlFor="actualPassword"> Actual password</label>
        <input type="password" name="actualPassword" id="" />
        <label htmlFor="newPassword"> New Password</label>
        <input type="password" name="newPassword" id="" />
        <label htmlFor="newPasswordCheck">checking new Password</label>
        <input type="password" name="newPasswordCheck" id="" />
    </form>
  )
}

export default ChangePassword