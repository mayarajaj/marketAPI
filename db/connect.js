const mongoose = require('mongoose')
//passward oLzS9QuLKPg0fKIf || ZYySZRufUGWZvQ7u


const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
