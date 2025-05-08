const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();

app.use(express.json());


   
// const sequelize = new Sequelize ("random", "root", "",{
//     host : "localhost",
//     dialect : "mysql",
// });

// sequelize
//     .authenticate()
//     .then(() =>{
//         console.log("Db connected successfully");
//     })

// .catch((err)=>{
//     console.log(err);
// });

// app.listen(3000);

//logger middleware
app.use((req,res,next)=>{
    console.log(`Api ${req.url} Accessed At ${new Date()}`);
    if(["POST","PUT"].includes(req.method)){
        console.log(`API BODY: ${JSON.stringify(req.body)}`);
    }
    next();
});


//auth middleware
app.use((req,res,next) =>{
    const headers = req.headers;
    const token = headers["token"];
    if(token){
        next();
    }else{
        //allow access for login
        const url = req.url;
        if(["/login"].includes(url)){
            next();
        } else{
            res.send("Access Denied");
        }
    }
});


const users = [{
    "username": "test",
    "name":"test",
    "password":"1234"
}];


//https://github.com/SantoshKumarSubedi/texas-node-may


app.post("/", (req, res) => {
    const { username, name, password } = req.body;
    if (!username || !name || !password) {
        return res.json({ message: "Invalid Request Body" });
    }
    users.push({ username, name, password });
    res.json({ message: "User Added Successfully" });
});


app.get("/", (req, res) => {
    res.json({ message: "Users Fetched Successfully", data: users });
});


app.get("/user/:username", (req, res) => {
    const { username } = req.params;
    const user = users.find(u => u.username === username);
    if (user) {
        res.json({ message: "User Fetched Successfully", data: user });
    } else {
        res.json({ message: "User Not Found" });
    }
});


app.delete("/user/:username", (req, res) => {
    const { username } = req.params;
    const index = users.findIndex(u => u.username === username);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1);
        res.json({ message: "User Deleted Successfully", data: deletedUser[0] });
    } else {
        res.json({ message: "User Not Found" });
    }
});


app.post("/login",(req,res)=>{

    const {username,password} = req.body;

    if (!username || !password ) {
        return res.json({ message: "Username and password is required." });
    }

    const user = users.find(u => u.username == username && u.password == password);

    if (user){
        res.json({message : "Login was Successful!", user});
    } else{
        res.json({message:"Invalid Credentials!"});
    }
});


app.get("/check", (req, res) => {
    console.log("Health Check");
    res.json({ status: "OK" });
});


app.listen(3000, (err) => {
    if(err){
        console.log(err)
    }else{
        console.log("Server is running on http://localhost:3000");
    }
});
