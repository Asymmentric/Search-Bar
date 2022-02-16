const express=require('express');
const mysql=require('mysql');
const dotenv=require('dotenv');

let pool=mysql.createPool({
    connectionLimit:100,
    host:'localhost',
    user:'root',
    password:'1234',
    database:'express01'
})

module.exports=pool;

