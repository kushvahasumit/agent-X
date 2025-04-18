const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const generateRoutes = require('./routes/generate')
const twitterRoutes = require('./routes/twitter')
const path = require('path')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(bodyParser.json());


app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use('/generate-post',generateRoutes);

app.use("/api", twitterRoutes);

app.get('/',(req,res)=>{
    res.send("Agent X's backend is running!")
})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})