
import express,{Request,Response,NextFunction} from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
import AuthRoutes  from './routes/auth.route';
import * as mongoose from 'mongoose';


dotenv.config()
const app=express();

app.use(express.json());
app.use(cors({
    origin:['http://localhost:3000']
}));

mongoose.connect(process.env.MONGO_DB_CONNECT!)
.then(result => {
    console.log("Database is connected ")
})
.catch(err => console.log(err))



app.get('/',(req:Request,res:Response)=>{   
    return res.status(200).json({
        message:"Geek"
    })
});

// auth routes
app.use('/api',AuthRoutes);


app.listen(process.env.ENV_PORT,()=>{
    console.log("App is running on port ",process.env.ENV_PORT);
})
