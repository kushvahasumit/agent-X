const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const generateRoutes = require('./routes/generate')
const twitterRoutes = require('./routes/twitter')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(bodyParser.json());



app.use('/generate-post',generateRoutes);

app.use("/api", twitterRoutes);

app.get('/',(req,res)=>{
    res.send("YouTube backend is running!")
})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})