const express = require('express')
const next = require('next')
const { join } = require('path')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const clientRoutes = require('./routes/client.routes.js')
const handle = app.getRequestHandler()
const customRoutesHandler = clientRoutes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  // server.use(express.json())

  server.get('/service-worker.js', (req, res) => {
    res.status(200).sendFile('service-worker.js', {
      root: join(__dirname, '.next')
    })
  })

  server.use(customRoutesHandler)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  const port = process.env.PORT || 3000

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on port ${port}...`)
  })
})
