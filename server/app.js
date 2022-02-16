const express=require('express');
const path=require('path')
const mysql=require('mysql');
const dotenv=require('dotenv')
dotenv.config({path:'../.env'});

const app = express();

const port=process.env.PORT || 5050;


app.use(express.static('../client'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/index.html'));    
})

const pool=require('../server/pools')

let data="";
app.post('/search',(req,res)=>{
    console.log(req.body);
    let searchQuery=req.body.value.trim();
    console.log(searchQuery);
    pool.getConnection((err,connection)=>{
        if(err) throw err;

        connection.query(`SELECT ${process.env.colBeerId},${process.env.colBeerName} From ${process.env.DB_TABLE} where name like `+connection.escape('%'+searchQuery+'%'),(err,results)=>{
            // console.log(sql);
            connection.release();

            if(!err){
                // console.log(sql);
                console.log(results);
                data=JSON.stringify(results);
                res.send(data)

            }else{
                console.log(err);
            }
        })
        
    })


    
})

app.get('/fetchbeer',(req,res)=>{
    // let sql="SELECT * from "+process.env.DB_TABLE;
    let sql=`Select ${process.env.colBeerId},${process.env.colBeerName} From ${process.env.DB_TABLE}`;
    pool.getConnection((err,connection)=>{
        if(err) throw err;

        connection.query(sql,(err,results)=>{

            connection.release();

            if(!err){
                console.log(sql);
                console.log(results);
                data=results
                res.send(data)

            }else{
                console.log(err);
            }
        })
        
    })
})

app.post('/addbeer',(req,res)=>{
    console.log(req.body);
    let values=[
        req.body.item
    ];
    

    let sql=`Insert into ${process.env.DB_TABLE} (${process.env.colBeerName}) values (?)`;
    pool.getConnection((err,connection)=>{
        if(err) throw err;

        connection.query(sql,[values],(err,results)=>{

            connection.release();

            if(!err){
                // console.log(sql);
                console.log(results); 
                data=JSON.stringify(results);
                res.send(data)

            }else{
                console.log(err);
            }
        })
        
    })

})

app.listen(port,console.log('The value of PORT is:',port))
