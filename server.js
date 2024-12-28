require('dotenv').config();
const express = require ("express");
const cors = require('cors')
const app = express();
// const router = require ("./router/auth-router")
const authRouter = require ("./router/auth-router")
const connectDB = require("./utils/db")
const errorMiddleware = require("./middlewares/error-middleware")
const reviewRouter = require('./router/reviewRouter');
const bookmarkRouter = require('./router/bookmarkRouter');

app.use(express.static('dist'));

const corsOptions = {
    origin:"http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE" ,
    credentials:true
}


app.use(cors(corsOptions))

app.use(express.json());

// app.use("/api/auth", router);

app.use("/api/auth", authRouter);


app.use('/api/reviews', reviewRouter);

app.use('/api/bookmarks', bookmarkRouter);



app.use(errorMiddleware)

const port = 5000;




connectDB().then(() => {

app.listen(port, () => {
    // console.log(`Server running at ${port}`)
    console.log(`Server is running at http://localhost:${port}`)
})

})
