const mongoose = require('mongoose');
const dotenv = require('dotenv')
const Image = require('./models/Images')
const products = require('./data/products')

dotenv.config()
const db = require('./config/keys').mongoURI;

mongoose
.connect(db)
.then(()=>console.log('database connected'))
.catch(err=>console.log(err))

const importData = async () => {
  try {
    await Image.deleteMany()

    await Image.insertMany(products)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Image.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}