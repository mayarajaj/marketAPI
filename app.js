require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./db/connect')

const notFoundMiddlewaer = require('./middleware/not-found')
//const ErrorMiddlewaer = require('./middleware/error-handler');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

const productRoute = require('./routes/products')

app.get('/', (req,res)=>{
    res.send('<h1>store API </h1><a href="/api/v1/products">products route</a>')
})
app.use('/api/v1/products' , productRoute);

app.use(notFoundMiddlewaer);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3003;
const start = async ()=>
{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port , console.log(`SERVER LISTEN TO PORT ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start();