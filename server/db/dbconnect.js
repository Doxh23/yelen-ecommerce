const mongoose = require('mongoose')


const dbconn = (url,port,app) =>{
    try{
        mongoose.connect(url,{
             useNewUrlParser: true,
             useUnifiedTopology: true,
             useCreateIndex: true
        }).then((data)=>{
            console.log(`mongodb connected with server ${data.connection.host}`)
        })

        app.listen(port,console.log(`server is listening at port ${port}`))
    }
    catch(err){
        console.log(err)
    }
}

module.exports = dbconn