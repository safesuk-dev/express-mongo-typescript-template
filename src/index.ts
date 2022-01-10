// ! Don't convert require into import
require('module-alias/register')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moduleAlias = require('module-alias')
moduleAlias.addAlias('@', __dirname)

import { createApp } from './app'
import { startServer } from './server'

  const app = createApp()
  startServer(app)
