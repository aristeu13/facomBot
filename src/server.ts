import app from './app'
import './config/env.config'

app.listen(process.env.PORT || 8080)
