const express = require('express')

const connectDB = require('./config/db')

const app = express();

//connect database
connectDB();

//int Middleware

app.use(express.json({extend: false}))

app.use('/api/users', require('./routes/api/users')); //middleware for parsing json request body
app.use('/api/auth', require('./routes/api/auth')); //middleware for parsing json request body
app.use('/api/profile', require('./routes/api/profile')); //middleware for parsing json request body
app.use('/api/posts', require('./routes/api/posts')); //middleware for parsing json request body

app.get('/', (req, res) => res.send("Api Runing"))
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server Started on port ${PORT}`));
