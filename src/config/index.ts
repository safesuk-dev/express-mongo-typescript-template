import pkg from '../../package.json'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const CONFIG = {
  APP: {
    NAME: pkg.name,
    VERSION: pkg.version,
    PORT: process.env.PORT || 8080,
    ENV: process.env.NODE_ENV,
  },
  MONGO:{
      CONNECTION_STRING:process.env.MONGO_CONNECTION_STRING,
      DATABASE_NAME:process.env.MONGO_DATABASE_NAME
  },
  AUTH:{
    SALT_ROUNDS:process.env.SALT_ROUNDS || '10',
    SECRET_KEY:process.env.SECRET_KEY || 'secret'
  }
}

export default CONFIG
