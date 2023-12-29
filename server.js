const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db')

dotenv.config({path:'./config/config.env'})

connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/ol', express.static(path.join(__dirname, '../frontend/node_modules/ol')));
app.use('/api/v1/stores',require('./routes/stores'))
app.use(express.static(path.join(__dirname,'../frontend')))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend/index.html'))
})

const Port = process.env.PORT;

app.listen(Port);