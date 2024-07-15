const {DataTypes}=require('sequelize');
const {sequelize}=require('../config/database');

const OrderItem=sequelize.define('OrderItem',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    orderId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    bookId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    }
})

module.exports=OrderItem