import CONFIG from '../config'
import mongoose from 'mongoose'

const connection = {
  url: CONFIG.MONGO.CONNECTION_STRING||'',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, 
  },
}

const mongo = {
  connect () {
    mongoose.Promise = global.Promise
    mongoose.connect(connection.url, connection.options).catch(err => {
      // raven.captureMessage(err.stack)
      throw new Error(err)
    })
  },
}
export default mongo