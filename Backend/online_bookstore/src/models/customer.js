const {DataTypes}=require('sequelize');
const {sequelize}=require('../config/database');
const Customer=sequelize.define('Customer',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    phone:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false
    }
});
module.exports=Customer;