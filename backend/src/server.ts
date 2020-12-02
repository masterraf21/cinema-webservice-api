import app from './app'
import * as conf from './config'
const env_var: Config.ProcessEnv = conf.getEnv()
app.listen(env_var.PORT, () => {
  console.log('Started on http://localhost:' + env_var.PORT)
  console.log('Here is your DB URL: ' + env_var.DATABASE)
})
