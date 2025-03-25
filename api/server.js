require('dotenv').config();
const express = require('express');
const cors = require('cors');
const api = express();

const router = require('./src/router');

api.add(cors());
api.add(express.json());
app.use(router);

app.listen(process.env.PORT,()=>{
    console.log('API respondendo em http://localhost:5000');
});