import app from './app'

import { getEnv } from './config'
const env_var: Config.ProcessEnv = getEnv()

app.listen(env_var.PORT, () => {
  console.log('Started on http://localhost:' + env_var.PORT)
  console.log('Here is your DB URL: ' + env_var.DATABASE)
})
