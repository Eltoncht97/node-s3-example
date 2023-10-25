import express from 'express'
import fileUpload from 'express-fileupload'
import { downloadFile, getFile, getFileUrl, getFiles, uploadFile } from './s3.js'

const app = express()

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
}))

app.get('/files', async (req, res) => {
  const result = await getFiles()
  res.json(result.Contents)
})

app.get('/files/:filename', async (req, res) => {
  const { filename } = req.params
  // const result = await getFile(filename)
  const result = await getFileUrl(filename)
  res.json({ url: result })
})

app.get('/downloadfile/:filename', async (req, res) => {
  const { filename } = req.params
  await downloadFile(filename)
  res.json({ message: 'File downloaded' })
})

app.post('/files', async (req, res) => {
  const result = await uploadFile(req.files.file)
  res.json({ result })
})

app.use(express.static('images'))

app.listen(3000)

console.log(`Server on port ${3000}`)