
require('dotenv').config();
const port = process.env.PORT || 5000;
const mongoString = process.env.DATABASE_URL;

const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:5000"
}));

const db = require('./models');
const Role = db.role;
const mongoose = require('mongoose');
db.mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const database = db.mongoose.connection;

database.on('error', ()=>{
    console.log('Database error.');
})
database.on('connected', ()=>{
    console.log('Database connected');
    initial();
})

function initial(){
    Role.estimatedDocumentCount( (err, count)=>{
        if(!err && count === 0){
            new Role({
                name: "admin"
            }).save(err=>{
                if(err){
                    console.log("error: ", err);
                }else{
                    console.log("added 'admin' role to roles collection")
                }
            })

            new Role({
                name: "moderator"
            }).save(err=>{
                if(err){
                    console.log("error: ", err);
                }else{
                    console.log("added 'moderator' role to roles collection")
                }
            })
        }
    });
}

const apiRouter = require('./routers/api.router');
app.use('/api', apiRouter);

app.get('/api/roles', (req, res)=>{
    Role.find((err, roles)=>{
        if(err){
            return res.status(500).send({message: err});
        }
        return res.send({roles});
    })
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})