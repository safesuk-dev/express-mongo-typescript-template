// import 'module-alias/register'
import 'graphql-import-node'
import { createApp } from './app'
import { startServer } from './server'

( async ()=>{
  const app = await createApp()
  startServer(app)
})()