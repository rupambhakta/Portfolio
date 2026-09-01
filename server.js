import 'dotenv/config'
import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleEnquiry } from './lib/contact.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')
const indexFile = path.join(distDir, 'index.html')
const port = Number(process.env.PORT || 3000)

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function json(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  res.end(JSON.stringify(data))
}

async function readJson(req) {
  const chunks = []
  let size = 0

  for await (const chunk of req) {
    size += chunk.length
    if (size > 1024 * 32) throw Object.assign(new Error('Payload too large'), { status: 413 })
    chunks.push(chunk)
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
}

async function handleContact(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })

  let body
  try {
    body = await readJson(req)
  } catch (error) {
    return json(res, error.status || 400, { error: 'Invalid request body.' })
  }

  const { status, body: payload } = await handleEnquiry(body)
  return json(res, status, payload)
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  const decodedPath = decodeURIComponent(url.pathname)
  const safePath = path.normalize(decodedPath).replace(/^[/\\]+/, '')
  const requestedPath = path.resolve(distDir, safePath || 'index.html')
  const isStaticFile =
    requestedPath.startsWith(`${distDir}${path.sep}`) && existsSync(requestedPath) && statSync(requestedPath).isFile()
  const filePath = isStaticFile ? requestedPath : indexFile

  if (!existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Build output not found. Run `npm run build` before `npm start`.')
    return
  }

  const ext = path.extname(filePath)
  res.writeHead(200, {
    'Content-Type': mimeTypes[ext] || 'application/octet-stream',
    'Cache-Control': filePath === indexFile ? 'no-cache' : 'public, max-age=31536000, immutable',
  })
  createReadStream(filePath).pipe(res)
}

createServer(async (req, res) => {
  if (req.url?.startsWith('/api/contact')) {
    await handleContact(req, res)
    return
  }

  serveStatic(req, res)
}).listen(port, () => {
  console.log(`Portfolio server running at http://localhost:${port}`)
})
