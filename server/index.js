const { camelize } = require('./utils')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const fs = require('fs')
const path = require('path')

const writeJsonFile = (jsonObj, resolve, reject) => {
  const jsonContent = JSON.stringify(jsonObj)

  const savePath = path.join(
    __dirname,
    '..',
    'receipts',
    `${camelize(jsonObj.name)}.json`
  )
  console.log('path:', savePath)
  fs.writeFile(savePath, jsonContent, 'utf8', function(err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.', err)
      return reject(err)
    }

    console.log('JSON file has been saved.')
    resolve('JSON file has been saved.')
  })
}

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/receipt', function(req, res, next) {
  console.log('receipt is', req.body)
  writeJsonFile(req.body, data => res.send(data))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
