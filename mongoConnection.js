const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const main = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/blog-case')
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log({message: "mongo connection error", error})
  }
}

main()