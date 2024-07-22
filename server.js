import fs from 'node:fs/promises'
import serialize from 'serialize-javascript'
import express from 'express'
import { sequelize } from './api/db.js'
import mainRouter from './api/routes/mainRouter.js'
import errhand from './api/middlewares/middlewares.js'
import morgan from 'morgan'
//import store from './src/redux/store.js'
import createStore from './src/redux/store.js'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
  : undefined

// Create http server
const app = express()
app.use(morgan('dev'))

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}
app.use(express.json()) // Ejecutar express.json()
app.use(errhand.validJson)
app.use('/api',mainRouter)

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }
    const store = createStore()
    // Obtén el estado pre-cargado del store
    const preloadedState = store.getState()

    // Renderiza el contenido de la aplicación
    const rendered = await render(url, ssrManifest, store)

    // Inyecta el estado pre-cargado en el HTML
    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')
      .replace(
        `</body>`,
        `<script>
          window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
        </script></body>`
      )

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

app.use(errhand.lostRoute)
app.use(errhand.errorEndWare)
// Start http server
app.listen(port, async () => {
  try {
    await sequelize.sync({force: false})
    console.log('Database connect succesfully 😉!!')
    console.log(`Server started at http://localhost:${port}`)
  } catch (error) {
    console.error('Error syncing database', error)
  }
})
