const express = require("express");
const { Sequelize, DataTypes} = require("sequelize");

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
        sequelize.sync();  //sync defined model with db
    })

.catch((err)=>{
    console.log(err);
});


const user = sequelize.define("user",{
    id:{
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    username:{
        type: DataTypes.STRING,
    },
    name:{
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
});




app.listen(3000);
