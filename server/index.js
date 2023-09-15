import express from 'express';
import mongoose from './config/mongoose.js';
import {router} from './routes/index.js';
import dotenv from 'dotenv';
import cors from 'cors';


const port = 1313;
const app = express();
const dtenv = dotenv.config();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}));




app.use(router);


app.listen(port, (error)=>{
    if(error){
        console.log(error);
        return;
    }
    console.log(`Server has started on port ${port}`);
})

