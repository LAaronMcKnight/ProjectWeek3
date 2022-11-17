const Food = require('../models/foodModel')

const mongoose = require('mongoose')

const fs = require('fs')

const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.once("open", () => {
  console.log("connected to mongodb -- importData.js")
})

const foodList = JSON.parse(fs.readFileSync(`${__dirname}/seed.json`, 'utf-8'))

const deleteDatabase = async () => {
  try{
    await Food.deleteMany()
  }
  catch (error){
    console.log(error)
  }
  finally{
    console.log('delete complete')
  }
}

const importData = async () => {
  try{
    await Food.create(foodList)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    console.log('input complete')
  }
}

if( process.argv[2] === '--delete' ){
  deleteDatabase()
}
else if ( process.argv[2] === '--import'){
  importData()
}