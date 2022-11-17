const express = require('express')

const logger = require('morgan')

const favicon = require('serve-favicon')

const dotenv = require('dotenv')

const mongoose = require('mongoose')

const userRouter = require('./routes/api/users')

const menuRouter = require('./routes/api/menu')

// const usedItemRouter = require('./routes/api/usedItems')

dotenv.config()

const port = 5001;

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.once('open', ()=> {
  console.log('connected to MongoDB')
})

// =============================== //

const app = express()

app.use(logger('dev'))

app.use(express.json())

app.use("/api/users", userRouter);
app.use('/api/menu', menuRouter)

// =============================== //



// =============================== //

app.all("*", (request, response) => {
  response.send("Undefined route");
});

app.listen(port, ()=> {
  console.log(`Listening on port ${port}`)
})