const express = require('express');
const app = express(); 
const authRouter = require('./routes/auth.routes')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const interviewRouter = require('./routes/interview.routes');

app.use(cookieParser())

app.use(express.json())

app.use(cors({
    // origin:"http://localhost:5173",
    origin:"https://interviewplanner.vercel.app",
    credentials:true
}))

app.use('/api/auth',authRouter)
app.use('/api/interview',interviewRouter)

app.get('/',(req,res)=>{
    res.send('Api Running...')
})

module.exports = app