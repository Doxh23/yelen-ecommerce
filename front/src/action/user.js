import axios from "axios";

export const checkLogin =async () => {
    try{
   const data =await axios.get("/api/v1/user/checkUser").then(res=> console.log(res.data.success))}
   catch(err){
console.log(err)
   }
}