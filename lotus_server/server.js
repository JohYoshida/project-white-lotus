const express = require('express')
const app = express()

// Use EJS
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('battle'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
