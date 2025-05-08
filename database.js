const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();

app.use(express.json());



const sequelize = new Sequelize ("random", "root", "",{
    host : "localhost",
    dialect : "mysql",
});

sequelize
    .authenticate()
    .then(() =>{
        console.log("Db connected successfully");
    })

.catch((err)=>{
    console.log(err);
});

app.listen(3000);
