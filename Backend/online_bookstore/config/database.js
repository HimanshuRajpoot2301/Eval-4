const{Sequelize}=require('sequelize');
const mongoose=require('mongoose');
require('dotenv').config()
const sequelize=new Sequelize(
    process.env.SQL_DB,
    process.env.SQL_USER,
    process.env.SQL_PASSWORD,
    {
        host:process.env.SQL_HOST,
        dialect:process.env.SQL_DIALECT
    }
);

const mongoConnect=mongoose.connect(process.env.MONGO_URI);
module.exports={sequelize,mongoConnect};