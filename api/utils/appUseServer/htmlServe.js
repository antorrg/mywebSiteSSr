import fs from 'node:fs/promises'
import express from 'express'
import { Transform } from 'node:stream'


export default async function  htmlServe (req, res){
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
  
      let didError = false
  
      const { pipe, abort } = render(url, ssrManifest, {
        onShellError() {
          res.status(500)
          res.set({ 'Content-Type': 'text/html' })
          res.send('<h1>Something went wrong</h1>')
        },
        onShellReady() {
          res.status(didError ? 500 : 200)
          res.set({ 'Content-Type': 'text/html' })
  
          const transformStream = new Transform({
            transform(chunk, encoding, callback) {
              res.write(chunk, encoding)
              callback()
            }
          })
  
          const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`)
  
          res.write(htmlStart)
  
          transformStream.on('finish', () => {
            res.end(htmlEnd)
          })
  
          pipe(transformStream)
        },
        onError(error) {
          didError = true
          console.error(error)
        }
      })
  
      setTimeout(() => {
        abort()
      }, ABORT_DELAY)
    } catch (e) {
      vite?.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  }